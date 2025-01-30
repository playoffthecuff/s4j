"use client";

import sleep from "@/lib/utils/sleep";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler, ReactNode } from "react";

export default function TransitionLink({
  href,
  children,
  className,
  scroll = true,
}: {
  href: string;
  children: ReactNode;
  scroll?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const main = document.querySelector("main");
  const handleClick: MouseEventHandler<HTMLAnchorElement> = async (e) => {
    e.preventDefault();
    if (main) main.style.opacity = "0";
    await sleep(100);
    router.push(href);
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      scroll={scroll}
      className={className}
      prefetch
    >
      {children}
    </Link>
  );
}
