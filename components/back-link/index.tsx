"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

export function BackLink({
  fallback,
  children,
}: {
  fallback: string;
  children: ReactNode;
}) {
  const [prev, setPrev] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const handleChange = () => {
      setPrev(router.asPath);
    };
    router.events.on("routeChangeComplete", handleChange);
    return () => router.events.off("routeChangeComplete", handleChange);
  }, [router]);

  return <Link href={prev || fallback}>{children}</Link>;
}
