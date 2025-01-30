"use client";

import { useI18n } from "@/lib/utils/i18context";
import { Button } from "../ui";
import Link from "next/link";
import { Variants } from "../ui/button";

export function LinkButton({
  translateName,
  link,
  className,
  variant,
}: {
  translateName: string;
  link: string;
  variant?: Variants;
  className?: string;
}) {
  const t = useI18n();
  return (
    <Button className={className} variant={variant} asChild>
      <Link href={link} className="no-underline" style={{fontSize: 16}}>{t[translateName]}</Link>
    </Button>
  );
}
