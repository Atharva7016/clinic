/**
 * Admin login — single administrator JWT auth.
 */
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaLock } from 'react-icons/fa';
import Spinner from '../../components/Spinner';
import { useAdminAuth } from '../context/AdminAuthContext';

function AdminLogin() {
  const { login, isAuthenticated, booting } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const rawFrom = location.state?.from?.pathname;
  const from =
    rawFrom && !rawFrom.includes('/login') ? rawFrom : '/admin';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: '', password: '', rememberMe: true },
  });

  useEffect(() => {
    if (!booting && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [booting, isAuthenticated, navigate, from]);

  const onSubmit = async (values) => {
    try {
      await login(values);
      toast.success('Login successful');
      navigate('/admin', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 px-4">
      <Helmet>
        <title>Admin Login | Clinic</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-800">
          <FaLock />
        </div>
        <h1 className="text-center text-2xl font-bold text-slate-900">Clinic Admin</h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          Sign in to manage appointments and clinic content
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-teal-600 focus:ring-2"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-teal-600 focus:ring-2"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" className="rounded" {...register('rememberMe')} />
              Remember Me
            </label>
            <button
              type="button"
              className="text-teal-700 hover:underline"
              onClick={() =>
                toast.info('Forgot password is not enabled. Contact your developer to reset.')
              }
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-70"
          >
            {isSubmitting ? <Spinner className="h-4 w-4" /> : null}
            {isSubmitting ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          <Link to="/" className="text-teal-700 hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
