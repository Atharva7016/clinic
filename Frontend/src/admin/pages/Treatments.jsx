/**
 * Treatments CRUD for the clinic admin.
 */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  getAdminTreatments,
  createAdminTreatment,
  updateAdminTreatment,
  deleteAdminTreatment,
} from '../services/adminApi';
import { mediaUrl } from '../utils/format';

const empty = {
  title: '',
  description: '',
  fullDescription: '',
  category: 'general',
  slug: '',
};

function TreatmentsAdmin() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [file, setFile] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [busy, setBusy] = useState(false);
  const { register, handleSubmit, reset } = useForm({ defaultValues: empty });

  const load = async () => {
    try {
      const res = await getAdminTreatments();
      setItems(res.data || []);
    } catch (err) {
      toast.error(err.message || 'Failed to load treatments');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (item) => {
    setEditing(item);
    setFile(null);
    reset({
      title: item.title,
      description: item.description,
      fullDescription: item.fullDescription || '',
      category: item.category || 'general',
      slug: item.slug || '',
    });
  };

  const startCreate = () => {
    setEditing(null);
    setFile(null);
    reset(empty);
  };

  const onSubmit = async (values) => {
    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => fd.append(k, v ?? ''));
    if (file) fd.append('image', file);

    setBusy(true);
    try {
      if (editing?._id) {
        await updateAdminTreatment(editing._id, fd);
        toast.success('Treatment updated');
      } else {
        await createAdminTreatment(fd);
        toast.success('Treatment created');
      }
      startCreate();
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
      await deleteAdminTreatment(deleteId);
      toast.success('Treatment deleted');
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
      <PageHeader
        title="Treatments"
        subtitle="Manage conditions and therapy cards"
        actions={
          <button
            type="button"
            onClick={startCreate}
            className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
          >
            New treatment
          </button>
        }
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800 md:grid-cols-2"
      >
        <input
          placeholder="Title"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
          {...register('title', { required: true })}
        />
        <input
          placeholder="Category"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
          {...register('category')}
        />
        <input
          placeholder="Slug (optional)"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 md:col-span-2"
          {...register('slug')}
        />
        <textarea
          placeholder="Short description"
          rows={3}
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 md:col-span-2"
          {...register('description', { required: true })}
        />
        <textarea
          placeholder="Full description"
          rows={4}
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 md:col-span-2"
          {...register('fullDescription')}
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
          {editing ? 'Update treatment' : 'Create treatment'}
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item._id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
          >
            {item.image && (
              <img
                src={mediaUrl(item.image)}
                alt={item.title}
                className="aspect-video w-full object-cover"
                loading="lazy"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500">{item.description}</p>
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

export default TreatmentsAdmin;
