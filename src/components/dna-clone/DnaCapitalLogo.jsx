export default function DnaCapitalLogo({ className = '' }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M16 2C10 8 6 14 6 16s4 8 10 14c6-6 10-12 10-14S22 8 16 2Z"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
      />
      <path
        d="M11 8c2.5 3 4 6.5 4 8s-1.5 5-4 8M21 8c-2.5 3-4 6.5-4 8s1.5 5 4 8"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M9 13h14M9 19h14"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.45"
      />
    </svg>
  )
}
