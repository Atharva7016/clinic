/**
 * Admin dashboard — summary cards + recent activity.
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalendarDay,
  FaHourglassHalf,
  FaCheckCircle,
  FaEnvelopeOpenText,
  FaImages,
  FaLeaf,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import Skeleton from '../../components/Skeleton';
import { getDashboard } from '../services/adminApi';
import { formatDate } from '../utils/format';

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getDashboard();
        setData(res.data);
      } catch (err) {
        toast.error(err.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div>
        <PageHeader title="Dashboard" subtitle="Clinic overview" />
        <Skeleton count={6} />
      </div>
    );
  }

  const cards = data?.cards || {};

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Today’s snapshot for your Ayurvedic clinic"
        actions={
          <Link
            to="/admin/appointments"
            className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            View appointments
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Today's Appointments"
          value={cards.todaysAppointments ?? 0}
          icon={FaCalendarDay}
          to="/admin/appointments?filter=today"
        />
        <StatCard
          label="Pending"
          value={cards.pendingAppointments ?? 0}
          icon={FaHourglassHalf}
          to="/admin/appointments?status=pending"
        />
        <StatCard
          label="Completed"
          value={cards.completedAppointments ?? 0}
          icon={FaCheckCircle}
          to="/admin/appointments?status=completed"
        />
        <StatCard
          label="Unread Messages"
          value={cards.unreadMessages ?? 0}
          icon={FaEnvelopeOpenText}
          to="/admin/messages?filter=unread"
        />
        <StatCard
          label="Gallery Images"
          value={cards.totalGallery ?? 0}
          icon={FaImages}
          to="/admin/gallery"
        />
        <StatCard
          label="Treatments"
          value={cards.totalTreatments ?? 0}
          icon={FaLeaf}
          to="/admin/treatments"
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-4 font-semibold">Recent Appointments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="pb-2 pr-3">Patient</th>
                  <th className="pb-2 pr-3">Problem</th>
                  <th className="pb-2 pr-3">Status</th>
                  <th className="pb-2">Created</th>
                </tr>
              </thead>
              <tbody>
                {(data?.recentAppointments || []).map((row) => (
                  <tr key={row._id} className="border-t border-slate-100 dark:border-slate-700">
                    <td className="py-2.5 pr-3 font-medium">{row.patientName}</td>
                    <td className="py-2.5 pr-3">{row.disease}</td>
                    <td className="py-2.5 pr-3 capitalize">{row.status}</td>
                    <td className="py-2.5 text-slate-500">{formatDate(row.createdAt)}</td>
                  </tr>
                ))}
                {!data?.recentAppointments?.length && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500">
                      No appointments yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Latest Messages</h2>
            <Link to="/admin/messages" className="text-sm text-teal-700 hover:underline">
              View all
            </Link>
          </div>
          <ul className="space-y-3">
            {(data?.latestMessages || []).map((msg) => (
              <li
                key={msg._id}
                className="rounded-xl border border-slate-100 p-3 dark:border-slate-700"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{msg.name}</p>
                  {!msg.isRead && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-800">
                      New
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-500">{msg.subject}</p>
              </li>
            ))}
            {!data?.latestMessages?.length && (
              <li className="py-6 text-center text-slate-500">No messages yet</li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
