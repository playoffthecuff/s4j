import Link from "next/link";

export default function Logo({ svg }: { svg: string }) {
  return (
    <Link href="/" prefetch>
      <div className="w-10 h-10" dangerouslySetInnerHTML={{ __html: svg }}></div>
    </Link>
  );
}
