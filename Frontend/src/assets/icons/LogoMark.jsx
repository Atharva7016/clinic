/**
 * Static SVG logo mark for brand usage.
 */
export const LogoMark = ({ className = 'h-10 w-10' }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="32" cy="32" r="30" fill="#0F766E" />
    <path
      d="M32 14c0 10-6 16-6 24a6 6 0 0012 0c0-8-6-14-6-24z"
      fill="#C8A951"
    />
    <path
      d="M22 34c4 6 7 10 10 10s6-4 10-10"
      stroke="#D1FAE5"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export default LogoMark;
