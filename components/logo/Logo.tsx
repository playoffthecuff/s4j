import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 5H40V11H0V5Z" fill="#888" fill-opacity="0.5" />
        <path d="M0 17H40V23H0V17Z" fill="#888" fill-opacity="0.5" />
        <path d="M0 29H40V35H0V29Z" fill="#888" fill-opacity="0.5" />
      </svg>
    </Link>
  );
}
