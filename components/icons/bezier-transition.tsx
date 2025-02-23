export function BezierTransitionIcon({
  height = 24,
  width = 24,
  className,
}: {
  height?: number;
  width?: number;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 34 48"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
    >
      <path d="M0 0C9.69946 4.53782 16.9999 24.3038 16.9999 48C16.9999 24.3038 24.3007 4.53782 34 0H0Z" />
    </svg>
  );
}
