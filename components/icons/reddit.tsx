export function RedditIcon({
  height = 24,
  width = 24,
  strokeWidth = 2,
}: {
  height?: number;
  width?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="14.36" rx="8.59" ry="6.2" />
      <path d="M3.44,13.85A2.39,2.39,0,1,1,5.8,10.08" />
      <path d="M20.56,13.85a2.39,2.39,0,1,0-2.36-3.77" />
      <path d="M8.18,16.75A7.12,7.12,0,0,0,12,17.7a7.12,7.12,0,0,0,3.82-.95" />
      <circle cx="8.66" cy="13.41" r="0.48" />
      <circle cx="15.34" cy="13.41" r="0.48" />
      <polyline points="12 8.16 12.96 3.39 17.73 4.34" />
      <circle cx="19.64" cy="4.34" r="1.91" />
    </svg>
  );
}
