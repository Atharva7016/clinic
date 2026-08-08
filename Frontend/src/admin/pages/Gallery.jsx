/**
 * Gallery management — upload / preview / delete.
 */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  getAdminGallery,
  createAdminGallery,
  deleteAdminGallery,
} from '../services/adminApi';
import { mediaUrl } from '../utils/format';

const CATEGORIES = ['Clinic', 'Reception', 'Treatment', 'Doctor', 'Panchakarma', 'Other'];

function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Clinic');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getAdminGallery();
      setItems(res.data || []);
    } catch (err) {
      toast.error(err.message || 'Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onFile = (f) => {
    if (!f) return;
    const ok = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(f.type);
    if (!ok) {
      toast.error('Only PNG, JPG, JPEG images are allowed');
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error('Maximum size is 5MB');
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const onUpload = async (e) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      toast.error('Title and image are required');
      return;
    }
    const fd = new FormData();
    fd.append('image', file);
    fd.append('title', title.trim());
    fd.append('category', category);

    setUploading(true);
    try {
      await createAdminGallery(fd);
      toast.success('Image uploaded');
      setTitle('');
      setFile(null);
      setPreview('');
      load();
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onDelete = async () => {
    setBusy(true);
    try {
      await deleteAdminGallery(deleteId);
      toast.success('Image deleted');
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader title="Gallery" subtitle="Upload and manage clinic photos" />

      <form
        onSubmit={onUpload}
        className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800 md:grid-cols-2"
      >
        <div className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Image title"
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-900"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-900"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={(e) => onFile(e.target.files?.[0])}
            className="block w-full text-sm"
          />
          <button
            type="submit"
            disabled={uploading}
            className="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {uploading ? 'Uploading…' : 'Upload Image'}
          </button>
        </div>
        <div className="flex min-h-[160px] items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900">
          {preview ? (
            <img src={preview} alt="Preview" className="max-h-48 object-contain" />
          ) : (
            <p className="text-sm text-slate-500">Image preview</p>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <article
              key={item._id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
            >
              <img
                src={mediaUrl(item.image)}
                alt={item.title}
                className="aspect-video w-full object-cover"
                loading="lazy"
              />
              <div className="flex items-center justify-between gap-2 p-3">
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.category}</p>
                </div>
                <button
                  type="button"
                  className="text-sm text-red-600 hover:underline"
                  onClick={() => setDeleteId(item._id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
          {!items.length && (
            <p className="text-slate-500 sm:col-span-2">No gallery images yet.</p>
          )}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteId)}
        onCancel={() => setDeleteId(null)}
        onConfirm={onDelete}
        loading={busy}
        message="Delete this gallery image?"
      />
    </div>
  );
}

export default GalleryAdmin;
