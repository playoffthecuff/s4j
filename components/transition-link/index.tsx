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
  disabled = false,
}: {
  href: string;
  children: ReactNode;
  scroll?: boolean;
  className?: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const handleClick: MouseEventHandler<HTMLAnchorElement> = async (e) => {
    const main = document.querySelector("main");
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
      aria-disabled={disabled}
    >
      {children}
    </Link>
  );
}
