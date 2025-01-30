export function LeftArrowKeyIcon({
  height = 32,
  width = 24,
}: {
  height?: number;
  width?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.569605 16.4322L3.39803 13.6038M1.00195 22.0006L8.9569 14.0457M3.61328 22.3885L9.44691 16.5548M6.75195 22.2508L9.4036 19.5991M0.53125 19.2203L6.1881 13.5635"
        strokeOpacity="0.5"
        strokeWidth="0.75"
      />
      <rect x="11.5508" y="2.5" width="9" height="9" rx="1.5" />
      <rect x="11.5" y="13.5" width="9" height="9" rx="1.5" />
      <rect x="22.5" y="13.5" width="9" height="9" rx="1.5" />
      <rect x="0.5" y="13.5" width="9" height="9" rx="1.5" />
      <path d="M7.01367 17.9144H3.01367M4.41367 16.5002L2.99946 17.9145M2.99941 17.9002L4.41363 19.3145" />
      <path d="M16.0504 9.01465V5.01465M17.4646 6.41465L16.0504 5.00043M16.0646 5.00039L14.6504 6.4146" />
      <path d="M15.9996 15.9004V19.9004M17.4138 18.5004L15.9996 19.9146M16.0138 19.9146L14.5996 18.5004" />
      <path d="M25 17.9H29M27.6 19.3142L29.0142 17.9M29.0143 17.9142L27.6 16.5" />
      <path d="M3.94888 11.5607L2.88822 10.5M6.0702 11.5607L7.13086 10.5M5.00954 10.5L5.00954 9" />
    </svg>
  );
}
