export function LeftClickZoomIcon({
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
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.90039 18H14.9004" />
      <path d="M17.5 18H23" />
      <path
        d="M14.5 8.75L8.48959 14.7604"
        strokeOpacity="0.5"
        strokeWidth="0.75"
      />
      <path d="M16 10.5L9 17.5" strokeOpacity="0.5" strokeWidth="0.75" />
      <path
        d="M16 13.75L11.7574 17.9926"
        strokeOpacity="0.5"
        strokeWidth="0.75"
      />
      <path d="M16 14.25L16 9" />
      <path d="M24 8C25.6569 8 27 6.65685 27 5C27 3.34315 25.6569 2 24 2C22.3431 2 21 3.34315 21 5C21 6.65685 22.3431 8 24 8Z" />
      <path d="M28 9L26.5 7.5" />
      <path d="M8 9.5H6.5M9.5 8V6.5M8 8L6.93934 6.93934" />
      <rect x="8.5" y="8.5" width="15" height="22" rx="5.5" />
      <rect x="15" y="14.5" width="2" height="5" rx="1" />
    </svg>
  );
}
