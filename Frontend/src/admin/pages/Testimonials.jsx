/**
 * Testimonials CRUD for the clinic admin.
 */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  getAdminTestimonials,
  createAdminTestimonial,
  updateAdminTestimonial,
  deleteAdminTestimonial,
} from '../services/adminApi';
import { mediaUrl } from '../utils/format';

function TestimonialsAdmin() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [file, setFile] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [busy, setBusy] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { patientName: '', rating: 5, review: '' },
  });

  const load = async () => {
    try {
      const res = await getAdminTestimonials();
      setItems(res.data || []);
    } catch (err) {
      toast.error(err.message || 'Failed to load testimonials');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (item) => {
    setEditing(item);
    setFile(null);
    reset({
      patientName: item.patientName,
      rating: item.rating,
      review: item.review,
    });
  };

  const onSubmit = async (values) => {
    const fd = new FormData();
    fd.append('patientName', values.patientName);
    fd.append('rating', String(values.rating));
    fd.append('review', values.review);
    if (file) fd.append('photo', file);

    setBusy(true);
    try {
      if (editing?._id) {
        await updateAdminTestimonial(editing._id, fd);
        toast.success('Testimonial updated');
      } else {
        await createAdminTestimonial(fd);
        toast.success('Testimonial created');
      }
      setEditing(null);
      setFile(null);
      reset({ patientName: '', rating: 5, review: '' });
      load();
    } catch (err) {
      toast.error(err.message || 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async () => {
    setBusy(true);
    try {
      await deleteAdminTestimonial(deleteId);
      toast.success('Testimonial deleted');
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
      <PageHeader title="Testimonials" subtitle="Patient reviews shown on the website" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800 md:grid-cols-2"
      >
        <input
          placeholder="Patient name"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
          {...register('patientName', { required: true })}
        />
        <select
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
          {...register('rating', { valueAsNumber: true })}
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} stars
            </option>
          ))}
        </select>
        <textarea
          placeholder="Review"
          rows={4}
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 md:col-span-2"
          {...register('review', { required: true })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0])}
          className="text-sm md:col-span-2"
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 md:col-span-2"
        >
          {editing ? 'Update testimonial' : 'Add testimonial'}
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item._id}
            className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-center gap-3">
              {item.photo ? (
                <img
                  src={mediaUrl(item.photo)}
                  alt={item.patientName}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-800">
                  {item.patientName?.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold">{item.patientName}</p>
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <FaStar key={i} size={12} />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{item.review}</p>
            <div className="mt-3 flex gap-3 text-sm">
              <button type="button" className="text-teal-700" onClick={() => startEdit(item)}>
                Edit
              </button>
              <button
                type="button"
                className="text-red-600"
                onClick={() => setDeleteId(item._id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(deleteId)}
        onCancel={() => setDeleteId(null)}
        onConfirm={onDelete}
        loading={busy}
      />
    </div>
  );
}

export default TestimonialsAdmin;
