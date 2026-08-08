/**
 * Doctor profile editor (single doctor).
 */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import { getAdminDoctor, updateAdminDoctor } from '../services/adminApi';
import { mediaUrl } from '../utils/format';

function DoctorProfile() {
  const [photoPreview, setPhotoPreview] = useState('');
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    (async () => {
      try {
        const res = await getAdminDoctor();
        const d = res.data;
        reset({
          name: d.name || '',
          qualification: d.qualification || '',
          experienceYears: d.experienceYears ?? 0,
          specialization: d.specialization || '',
          about: d.about || '',
          achievements: (d.achievements || []).join('\n'),
        });
        if (d.photo) setPhotoPreview(mediaUrl(d.photo));
      } catch (err) {
        toast.error(err.message || 'Failed to load doctor profile');
      }
    })();
  }, [reset]);

  const onSubmit = async (values) => {
    const fd = new FormData();
    fd.append('name', values.name);
    fd.append('qualification', values.qualification);
    fd.append('experienceYears', String(values.experienceYears));
    fd.append('specialization', values.specialization);
    fd.append('about', values.about);
    fd.append('achievements', values.achievements || '');
    if (file) fd.append('photo', file);

    setBusy(true);
    try {
      const res = await updateAdminDoctor(fd);
      toast.success('Doctor profile saved');
      if (res.data?.photo) setPhotoPreview(mediaUrl(res.data.photo));
    } catch (err) {
      toast.error(err.message || 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader title="Doctor Profile" subtitle="Public profile details for the clinic website" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-3xl gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-900">
            {photoPreview ? (
              <img src={photoPreview} alt="Doctor" className="h-full w-full object-cover" />
            ) : null}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              setFile(f || null);
              if (f) setPhotoPreview(URL.createObjectURL(f));
            }}
          />
        </div>

        <input
          placeholder="Doctor name"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
          {...register('name', { required: true })}
        />
        <input
          placeholder="Qualification"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
          {...register('qualification')}
        />
        <input
          type="number"
          placeholder="Years of experience"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
          {...register('experienceYears', { valueAsNumber: true })}
        />
        <input
          placeholder="Specialization"
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
          {...register('specialization')}
        />
        <textarea
          placeholder="About doctor"
          rows={4}
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
          {...register('about')}
        />
        <textarea
          placeholder="Achievements (one per line)"
          rows={4}
          className="rounded-xl border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
          {...register('achievements')}
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {busy ? 'Saving…' : 'Save profile'}
        </button>
      </form>
    </div>
  );
}

export default DoctorProfile;
