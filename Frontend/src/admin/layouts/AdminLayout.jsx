/**
 * Admin shell — sidebar + top bar + dark mode for single-doctor clinic.
 */
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaEnvelope,
  FaImages,
  FaLeaf,
  FaStar,
  FaUserMd,
  FaClinicMedical,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaSignOutAlt,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAdminAuth } from '../context/AdminAuthContext';
import { CLINIC } from '../../data/clinic';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: FaTachometerAlt, end: true },
  { to: '/admin/appointments', label: 'Appointments', icon: FaCalendarCheck },
  { to: '/admin/messages', label: 'Messages', icon: FaEnvelope },
  { to: '/admin/gallery', label: 'Gallery', icon: FaImages },
  { to: '/admin/treatments', label: 'Treatments', icon: FaLeaf },
  { to: '/admin/testimonials', label: 'Testimonials', icon: FaStar },
  { to: '/admin/doctor', label: 'Doctor Profile', icon: FaUserMd },
  { to: '/admin/settings', label: 'Clinic Settings', icon: FaClinicMedical },
];

function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('admin_dark') === '1');

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('admin_dark', '1');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('admin_dark', '0');
    }
  }, [dark]);

  const onLogout = async () => {
    await logout();
    toast.info('Logged out');
    navigate('/admin/login');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
      isActive
        ? 'bg-teal-700 text-white'
        : 'text-slate-600 hover:bg-teal-50 hover:text-teal-800 dark:text-slate-300 dark:hover:bg-slate-700'
    }`;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform dark:border-slate-700 dark:bg-slate-800 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
          <Link to="/admin" className="font-bold text-teal-800 dark:text-teal-300">
            Clinic Admin
          </Link>
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              <Icon className="opacity-80" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-3 dark:border-slate-700">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-700 dark:bg-slate-800/90 sm:px-6">
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 lg:hidden dark:border-slate-600"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
          <p className="hidden max-w-md truncate text-sm text-slate-500 sm:block dark:text-slate-400">
            {CLINIC.name}
          </p>
          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDark((v) => !v)}
              className="rounded-lg border border-slate-200 p-2 dark:border-slate-600"
              aria-label="Toggle dark mode"
            >
              {dark ? <FaSun /> : <FaMoon />}
            </button>
            <div className="flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 dark:bg-teal-900/30">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">
                {(user?.name || 'D').charAt(0)}
              </span>
              <span className="hidden text-sm font-medium sm:inline">
                {user?.name || 'Doctor'}
              </span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
