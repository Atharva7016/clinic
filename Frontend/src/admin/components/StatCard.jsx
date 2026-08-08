/**
 * Small stat card for admin dashboard — optional link to detail table/page.
 */
import { Link } from 'react-router-dom';

function StatCard({ label, value, icon: Icon, to }) {
  const inner = (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="mt-2 text-3xl font-bold text-teal-700 dark:text-teal-300">{value}</p>
      </div>
      {Icon && (
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-900/40 dark:text-teal-200">
          <Icon />
        </span>
      )}
    </div>
  );

  const className =
    'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition dark:border-slate-700 dark:bg-slate-800';

  if (to) {
    return (
      <Link
        to={to}
        className={`${className} block hover:border-teal-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600`}
      >
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}

export default StatCard;
