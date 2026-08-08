/**
 * Compact inline spinner for buttons / sections.
 */
function Spinner({ className = 'h-5 w-5', label = 'Loading' }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-current border-r-transparent ${className}`}
      role="status"
      aria-label={label}
    />
  );
}

export default Spinner;
