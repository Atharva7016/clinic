/**
 * Appointment management — search, status / calendar date filter, pagination.
 */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  getAdminAppointments,
  updateAdminAppointment,
  deleteAdminAppointment,
  downloadAppointmentsExcel,
} from '../services/adminApi';
import { formatDate, formatDay } from '../utils/format';

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];
const PAGE_SIZE = 8;

const toYmd = (value = new Date()) => {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const matchesDate = (value, ymd) => {
  if (!ymd) return true;
  if (!value) return false;
  return toYmd(value) === ymd;
};

function resolveDateFromParams(filterParam, dateParam) {
  if (filterParam === 'today') return toYmd();
  if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) return dateParam;
  return '';
}

function Appointments() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get('status') || '';
  const filterParam = searchParams.get('filter') || '';
  const dateParam = searchParams.get('date') || '';

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(
    STATUSES.includes(statusParam) ? statusParam : ''
  );
  const [dateFilter, setDateFilter] = useState(() =>
    resolveDateFromParams(filterParam, dateParam)
  );
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    setStatus(STATUSES.includes(statusParam) ? statusParam : '');
    setDateFilter(resolveDateFromParams(filterParam, dateParam));
  }, [statusParam, filterParam, dateParam]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getAdminAppointments(
        status && !dateFilter ? { status } : undefined
      );
      setRows(res.data || []);
    } catch (err) {
      toast.error(err.message || 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, dateFilter]);

  const filtered = useMemo(() => {
    let list = rows;

    if (dateFilter) {
      list = list.filter((r) => matchesDate(r.preferredDate, dateFilter));
    }

    if (status && dateFilter) {
      list = list.filter((r) => r.status === status);
    }

    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (r) =>
        r.patientName?.toLowerCase().includes(q) ||
        r.phone?.includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.disease?.toLowerCase().includes(q)
    );
  }, [rows, search, dateFilter, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [search, status, dateFilter]);

  const updateParams = (nextStatus, nextDate) => {
    const params = {};
    if (nextStatus) params.status = nextStatus;
    if (nextDate) {
      if (nextDate === toYmd()) params.filter = 'today';
      else params.date = nextDate;
    }
    setSearchParams(params, { replace: true });
  };

  const onStatusFilter = (value) => {
    setStatus(value);
    updateParams(value, dateFilter);
  };

  const onDateFilter = (value) => {
    setDateFilter(value);
    updateParams(status, value);
  };

  const clearDate = () => {
    setDateFilter('');
    updateParams(status, '');
  };

  const onStatusChange = async (id, next) => {
    try {
      await updateAdminAppointment(id, { status: next });
      toast.success('Appointment updated');
      load();
    } catch (err) {
      toast.error(err.message || 'Update failed');
    }
  };

  const onDelete = async () => {
    setBusy(true);
    try {
      await deleteAdminAppointment(deleteId);
      toast.success('Appointment deleted');
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    } finally {
      setBusy(false);
    }
  };

  const onExportExcel = async () => {
    setExporting(true);
    try {
      const blob = await downloadAppointmentsExcel();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'appointments.xlsx';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Excel downloaded');
    } catch (err) {
      toast.error(err.message || 'Excel download failed');
    } finally {
      setExporting(false);
    }
  };

  const subtitle = dateFilter
    ? `Appointments for ${formatDay(dateFilter)}${status ? ` · ${status}` : ''}`
    : status
      ? `${status.charAt(0).toUpperCase() + status.slice(1)} appointments`
      : 'Review and update patient booking requests';

  return (
    <div>
      <PageHeader
        title="Appointments"
        subtitle={subtitle}
        actions={
          <button
            type="button"
            onClick={onExportExcel}
            disabled={exporting}
            className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
          >
            {exporting ? 'Preparing…' : 'Download Excel'}
          </button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, phone, problem…"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800 sm:max-w-sm"
        />
        <select
          value={status}
          onChange={(e) => onStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="appointment-date-filter" className="sr-only">
            Filter by date
          </label>
          <input
            id="appointment-date-filter"
            type="date"
            value={dateFilter}
            onChange={(e) => onDateFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800"
          />
          <button
            type="button"
            onClick={() => onDateFilter(toYmd())}
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700"
          >
            Today
          </button>
          {dateFilter && (
            <button
              type="button"
              onClick={clearDate}
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Clear date
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-900/40">
            <tr>
              {[
                'Patient',
                'Phone',
                'Email',
                'Problem',
                'Date',
                'Time',
                'Status',
                'Created',
                'Actions',
              ].map((h) => (
                <th key={h} className="px-3 py-3 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={9} className="px-3 py-8 text-center text-slate-500">
                  Loading…
                </td>
              </tr>
            )}
            {!loading &&
              pageRows.map((row) => (
                <tr
                  key={row._id}
                  className="border-t border-slate-100 dark:border-slate-700"
                >
                  <td className="px-3 py-3 font-medium">{row.patientName}</td>
                  <td className="px-3 py-3">{row.phone}</td>
                  <td className="px-3 py-3">{row.email || '—'}</td>
                  <td className="px-3 py-3">{row.disease}</td>
                  <td className="px-3 py-3">{formatDay(row.preferredDate)}</td>
                  <td className="px-3 py-3">{row.preferredTime || '—'}</td>
                  <td className="px-3 py-3">
                    <select
                      value={row.status}
                      onChange={(e) => onStatusChange(row._id, e.target.value)}
                      className="rounded-lg border border-slate-200 bg-transparent px-2 py-1 capitalize dark:border-slate-600"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-3 text-slate-500">{formatDate(row.createdAt)}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="text-teal-700 hover:underline"
                        onClick={() => setSelected(row)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="text-red-600 hover:underline"
                        onClick={() => setDeleteId(row._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {!loading && !pageRows.length && (
              <tr>
                <td colSpan={9} className="px-3 py-8 text-center text-slate-500">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <p className="text-slate-500">
          Page {page} of {totalPages} · {filtered.length} results
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border px-3 py-1 disabled:opacity-40 dark:border-slate-600"
          >
            Prev
          </button>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border px-3 py-1 disabled:opacity-40 dark:border-slate-600"
          >
            Next
          </button>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 dark:bg-slate-800">
            <h3 className="text-lg font-semibold">{selected.patientName}</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div><dt className="text-slate-500">Phone</dt><dd>{selected.phone}</dd></div>
              <div><dt className="text-slate-500">Email</dt><dd>{selected.email || '—'}</dd></div>
              <div><dt className="text-slate-500">Age / Gender</dt><dd>{selected.age} · {selected.gender}</dd></div>
              <div><dt className="text-slate-500">Problem</dt><dd>{selected.disease}</dd></div>
              <div><dt className="text-slate-500">Preferred</dt><dd>{formatDay(selected.preferredDate)} {selected.preferredTime}</dd></div>
              <div><dt className="text-slate-500">Notes</dt><dd>{selected.notes || '—'}</dd></div>
              <div><dt className="text-slate-500">Status</dt><dd className="capitalize">{selected.status}</dd></div>
            </dl>
            <button
              type="button"
              className="mt-6 rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteId)}
        onCancel={() => setDeleteId(null)}
        onConfirm={onDelete}
        loading={busy}
        message="Delete this appointment permanently?"
      />
    </div>
  );
}

export default Appointments;
