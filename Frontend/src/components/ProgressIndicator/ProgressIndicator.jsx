/**
 * Thin progress bar for async actions.
 */
function ProgressIndicator({ value = 0, label = 'Progress' }) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full" aria-label={label}>
      <div
        className="h-2 overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressIndicator;
