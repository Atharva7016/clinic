/**
 * Card skeleton placeholders while lists load.
 */
function Skeleton({ count = 6, variant = 'card' }) {
  if (variant === 'testimonial') {
    return (
      <div className="mx-auto max-w-3xl animate-pulse rounded-[2rem] border border-secondary bg-white p-8 md:p-12">
        <div className="mb-6 h-8 w-8 rounded bg-secondary" />
        <div className="mb-3 h-4 w-28 rounded bg-secondary" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-secondary" />
          <div className="h-4 w-11/12 rounded bg-secondary" />
          <div className="h-4 w-4/5 rounded bg-secondary" />
        </div>
        <div className="mt-8 flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-secondary" />
          <div className="h-4 w-32 rounded bg-secondary" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-6 ${
        variant === 'gallery' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3'
      }`}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border border-secondary bg-white"
        >
          <div className={`bg-secondary ${variant === 'gallery' ? 'min-h-[200px]' : 'aspect-[16/10]'}`} />
          {variant !== 'gallery' && (
            <div className="space-y-3 p-5">
              <div className="h-5 w-2/3 rounded bg-secondary" />
              <div className="h-4 w-full rounded bg-secondary" />
              <div className="h-4 w-5/6 rounded bg-secondary" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
