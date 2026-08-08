/**
 * Empty list state.
 */
function EmptyState({ title = 'Nothing here yet', message = 'Check back soon.', action }) {
  return (
    <div className="rounded-2xl border border-dashed border-secondary bg-white px-6 py-14 text-center">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">{message}</p>
      {action}
    </div>
  );
}

export default EmptyState;
