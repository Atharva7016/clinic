/**
 * Admin-oriented image uploader (multipart) with toast feedback.
 * Uses galleryService by default; pass `onUpload` for treatments/testimonials.
 */
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Spinner from '../Spinner';
import { createGalleryItem } from '../../services/gallery';

const ACCEPT = 'image/png,image/jpeg,image/jpg,image/webp,image/gif';
const MAX_BYTES = 5 * 1024 * 1024;

function ImageUploader({
  token,
  category = 'Other',
  title = 'Clinic photo',
  onUploaded,
  uploadFn,
  fieldName = 'image',
}) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFile = async (file) => {
    if (!file) return;

    if (!ACCEPT.split(',').some((t) => file.type === t || file.type === 'image/jpg')) {
      toast.error('Only PNG, JPG, JPEG, WEBP, or GIF images are allowed');
      return;
    }

    if (file.size > MAX_BYTES) {
      toast.error('Image must be 5MB or smaller');
      return;
    }

    if (!token && !localStorage.getItem('token')) {
      toast.error('Admin login required to upload images');
      return;
    }

    const formData = new FormData();
    formData.append(fieldName, file);
    formData.append('title', title);
    formData.append('category', category);

    setLoading(true);
    setProgress(20);

    try {
      const uploader =
        uploadFn ||
        ((fd, config) => createGalleryItem(fd, config));

      setProgress(55);
      const response = await uploader(formData, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        onUploadProgress: (event) => {
          if (!event.total) return;
          setProgress(Math.min(95, Math.round((event.loaded / event.total) * 100)));
        },
      });

      setProgress(100);
      toast.success('Upload successful');
      onUploaded?.(response.data);
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 600);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="rounded-2xl border border-dashed border-secondary bg-secondary-soft p-6">
      <label className="flex cursor-pointer flex-col items-center gap-3 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-soft">
          {loading ? <Spinner /> : <FaCloudUploadAlt size={22} aria-hidden="true" />}
        </span>
        <span className="text-sm font-semibold text-ink">Upload image</span>
        <span className="text-xs text-ink-muted">PNG, JPG, JPEG · max 5MB</span>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          disabled={loading}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </label>

      {progress > 0 && (
        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-white"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
