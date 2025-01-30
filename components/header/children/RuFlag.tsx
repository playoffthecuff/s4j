import { CSSProperties } from "react";

export function RuFlag({
  width = 24,
  height = 24,
  style,
}: {
  width?: number;
  height?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <mask id="path-1-inside-1_44702_4345" fill="white">
        <path d="M1 15H23V17.9C23 19.0598 22.0598 20 20.9 20H3.1C1.9402 20 1 19.0598 1 17.9V15Z" />
      </mask>
      <path
        d="M1 15H23V17.9C23 19.0598 22.0598 20 20.9 20H3.1C1.9402 20 1 19.0598 1 17.9V15Z"
        fill="#E53B35"
      />
      <path
        d="M1 15H23H1ZM23.5 17.9C23.5 19.3359 22.3359 20.5 20.9 20.5H3.1C1.66406 20.5 0.5 19.3359 0.5 17.9H1.5C1.5 18.7837 2.21634 19.5 3.1 19.5H20.9C21.7837 19.5 22.5 18.7837 22.5 17.9H23.5ZM3.1 20.5C1.66406 20.5 0.5 19.3359 0.5 17.9V15H1.5V17.9C1.5 18.7837 2.21634 19.5 3.1 19.5V20.5ZM23.5 15V17.9C23.5 19.3359 22.3359 20.5 20.9 20.5V19.5C21.7837 19.5 22.5 18.7837 22.5 17.9V15H23.5Z"
        fill="#808080"
        fillOpacity="0.75"
        mask="url(#path-1-inside-1_44702_4345)"
      />
      <mask id="path-3-inside-2_44702_4345" fill="white">
        <path d="M1 9H23V15H1V9Z" />
      </mask>
      <path d="M1 9H23V15H1V9Z" fill="#0C47B7" />
      <path
        d="M22.5 9V15H23.5V9H22.5ZM1.5 15V9H0.5V15H1.5Z"
        fill="#808080"
        fillOpacity="0.75"
        mask="url(#path-3-inside-2_44702_4345)"
      />
      <mask id="path-5-inside-3_44702_4345" fill="white">
        <path d="M1 6.1C1 4.9402 1.9402 4 3.1 4H20.9C22.0598 4 23 4.9402 23 6.1V9H1V6.1Z" />
      </mask>
      <path
        d="M1 6.1C1 4.9402 1.9402 4 3.1 4H20.9C22.0598 4 23 4.9402 23 6.1V9H1V6.1Z"
        fill="white"
      />
      <path
        d="M0.5 6.1C0.5 4.66406 1.66406 3.5 3.1 3.5H20.9C22.3359 3.5 23.5 4.66406 23.5 6.1H22.5C22.5 5.21634 21.7837 4.5 20.9 4.5H3.1C2.21634 4.5 1.5 5.21634 1.5 6.1H0.5ZM23 9H1H23ZM0.5 9V6.1C0.5 4.66406 1.66406 3.5 3.1 3.5V4.5C2.21634 4.5 1.5 5.21634 1.5 6.1V9H0.5ZM20.9 3.5C22.3359 3.5 23.5 4.66406 23.5 6.1V9H22.5V6.1C22.5 5.21634 21.7837 4.5 20.9 4.5V3.5Z"
        fill="#808080"
        fillOpacity="0.75"
        mask="url(#path-5-inside-3_44702_4345)"
      />
    </svg>
  );
}
