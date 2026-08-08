/**
 * Contact messages inbox for the clinic admin.
 */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  getAdminMessages,
  getAdminMessage,
  deleteAdminMessage,
} from '../services/adminApi';
import { formatDate } from '../utils/format';

const PAGE_SIZE = 10;

function Messages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get('filter') || '';

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [unreadOnly, setUnreadOnly] = useState(filterParam === 'unread');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setUnreadOnly(filterParam === 'unread');
  }, [filterParam]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getAdminMessages();
      setRows(res.data || []);
    } catch (err) {
      toast.error(err.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    let list = unreadOnly ? rows.filter((r) => !r.isRead) : rows;
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (r) =>
        r.name?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.subject?.toLowerCase().includes(q) ||
        r.phone?.includes(q)
    );
  }, [rows, search, unreadOnly]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [search, unreadOnly]);

  const onUnreadToggle = (checked) => {
    setUnreadOnly(checked);
    if (checked) {
      setSearchParams({ filter: 'unread' }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const viewMessage = async (id) => {
    try {
      const res = await getAdminMessage(id);
      setSelected(res.data);
      setRows((prev) =>
        prev.map((m) => (m._id === id ? { ...m, isRead: true } : m))
      );
    } catch (err) {
      toast.error(err.message || 'Failed to open message');
    }
  };

  const onDelete = async () => {
    setBusy(true);
    try {
      await deleteAdminMessage(deleteId);
      toast.success('Message deleted');
      setDeleteId(null);
      setSelected(null);
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
        title="Messages"
        subtitle={unreadOnly ? 'Unread contact form inquiries' : 'Contact form inquiries'}
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search messages…"
          className="w-full max-w-sm rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800"
        />
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            checked={unreadOnly}
            onChange={(e) => onUnreadToggle(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
          />
          Unread only
        </label>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-900/40">
            <tr>
              {['Name', 'Phone', 'Email', 'Subject', 'Date', 'Actions'].map((h) => (
                <th key={h} className="px-3 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-slate-500">
                  Loading…
                </td>
              </tr>
            )}
            {!loading &&
              pageRows.map((row) => (
                <tr key={row._id} className="border-t border-slate-100 dark:border-slate-700">
                  <td className="px-3 py-3 font-medium">
                    {row.name}
                    {!row.isRead && (
                      <span className="ml-2 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-amber-800">
                        New
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3">{row.phone}</td>
                  <td className="px-3 py-3">{row.email}</td>
                  <td className="px-3 py-3">{row.subject}</td>
                  <td className="px-3 py-3 text-slate-500">{formatDate(row.createdAt)}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="text-teal-700 hover:underline"
                        onClick={() => viewMessage(row._id)}
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
                <td colSpan={6} className="px-3 py-8 text-center text-slate-500">
                  No messages found
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
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 dark:bg-slate-800">
            <h3 className="text-lg font-semibold">{selected.subject}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {selected.name} · {selected.email} · {selected.phone}
            </p>
            <p className="mt-4 whitespace-pre-wrap text-sm">{selected.message}</p>
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
      />
    </div>
  );
}

export default Messages;
