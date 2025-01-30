export function LeftClickNavIcon({
  height = 24,
  width = 32,
}: {
  height?: number;
  width?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <path d="M8.90039 18H14.9004" />
      <path d="M17.5 18H23" />
      <path
        d="M14.5 8.75L8.48959 14.7604"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="0.75"
      
      />
      <path
        d="M16 10.5L9 17.5"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="0.75"
      
      />
      <path
        d="M16 13.75L11.7574 17.9926"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="0.75"
      
      />
      <path d="M16 14.25L16 9" />
      <path
        d="M27.4746 3.97461L24.9997 1.49974"
        stroke="currentColor"
      
      />
      <path
        d="M27.4746 3.97461L24.9997 6.44948"
        stroke="currentColor"
      
      />
      <path
        d="M20 3.97461L22.4749 6.44948"
        stroke="currentColor"
      
      />
      <path
        d="M20 3.97461L22.4749 1.49974"
        stroke="currentColor"
      
      />
      <path
        d="M8 9.5H6.5M9.5 8V6.5M8 8L6.93934 6.93934"
        stroke="currentColor"
      
      />
      <rect x="8.5" y="8.5" width="15" height="22" rx="5.5" />
      <rect x="15" y="14.5" width="2" height="5" rx="1" />
    </svg>
  );
}
