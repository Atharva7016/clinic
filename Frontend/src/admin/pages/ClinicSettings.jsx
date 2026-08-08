/**
 * Clinic settings editor — contact, map, social, branding assets.
 */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import {
  getAdminClinicSettings,
  updateAdminClinicSettings,
} from '../services/adminApi';
import { mediaUrl } from '../utils/format';

function ClinicSettings() {
  const [logoPreview, setLogoPreview] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    (async () => {
      try {
        const res = await getAdminClinicSettings();
        const s = res.data;
        reset({
          clinicName: s.clinicName || '',
          address: s.address || '',
          phone: s.phone || '',
          whatsappNumber: s.whatsappNumber || '',
          email: s.email || '',
          googleMapEmbedUrl: s.googleMapEmbedUrl || '',
          weekdays: s.workingHours?.weekdays || '',
          sunday: s.workingHours?.sunday || '',
          instagram: s.social?.instagram || '',
          facebook: s.social?.facebook || '',
          youtube: s.social?.youtube || '',
        });
        if (s.logo) setLogoPreview(mediaUrl(s.logo));
      } catch (err) {
        toast.error(err.message || 'Failed to load settings');
      }
    })();
  }, [reset]);

  const onSubmit = async (values) => {
    const fd = new FormData();
    fd.append('clinicName', values.clinicName);
    fd.append('address', values.address);
    fd.append('phone', values.phone);
    fd.append('whatsappNumber', values.whatsappNumber);
    fd.append('email', values.email);
    fd.append('googleMapEmbedUrl', values.googleMapEmbedUrl);
    fd.append(
      'workingHours',
      JSON.stringify({ weekdays: values.weekdays, sunday: values.sunday })
    );
    fd.append(
      'social',
      JSON.stringify({
        instagram: values.instagram,
        facebook: values.facebook,
        youtube: values.youtube,
      })
    );
    if (logoFile) fd.append('logo', logoFile);
    if (faviconFile) fd.append('favicon', faviconFile);

    setBusy(true);
    try {
      const res = await updateAdminClinicSettings(fd);
      toast.success('Settings saved');
      if (res.data?.logo) setLogoPreview(mediaUrl(res.data.logo));
    } catch (err) {
      toast.error(err.message || 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  const field =
    'rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900';

  return (
    <div>
      <PageHeader
        title="Clinic Settings"
        subtitle="Contact details, map embed, and social links"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-3xl gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
      >
        <input placeholder="Clinic name" className={field} {...register('clinicName')} />
        <textarea placeholder="Address" rows={2} className={field} {...register('address')} />
        <div className="grid gap-3 sm:grid-cols-2">
          <input placeholder="Phone" className={field} {...register('phone')} />
          <input
            placeholder="WhatsApp number (9198…)"
            className={field}
            {...register('whatsappNumber')}
          />
        </div>
        <input placeholder="Email" className={field} {...register('email')} />
        <textarea
          placeholder="Google Map embed URL"
          rows={2}
          className={field}
          {...register('googleMapEmbedUrl')}
        />
        <input placeholder="Weekday hours" className={field} {...register('weekdays')} />
        <input placeholder="Sunday hours" className={field} {...register('sunday')} />
        <input placeholder="Instagram URL" className={field} {...register('instagram')} />
        <input placeholder="Facebook URL" className={field} {...register('facebook')} />
        <input placeholder="YouTube URL" className={field} {...register('youtube')} />

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            Logo
            {logoPreview && (
              <img src={logoPreview} alt="Logo" className="my-2 h-12 object-contain" />
            )}
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full"
              onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
            />
          </label>
          <label className="text-sm">
            Favicon
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full"
              onChange={(e) => setFaviconFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {busy ? 'Saving…' : 'Save settings'}
        </button>
      </form>
    </div>
  );
}

export default ClinicSettings;
