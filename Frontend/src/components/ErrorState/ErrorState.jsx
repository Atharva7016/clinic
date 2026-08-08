/**
 * Fetch / request error state with optional retry.
 */
function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load this content.',
  onRetry,
}) {
  return (
    <div
      className="rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center"
      role="alert"
    >
      <h3 className="text-lg font-semibold text-red-800">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-red-700">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-primary mt-5">
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
