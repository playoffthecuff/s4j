"use client";

import { useI18n } from "@/lib/utils/i18context";
import Link from "next/link";
import { Button } from "../ui";
import { Variants } from "../ui/button";
import clsx from "clsx";

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
    <Button className={clsx("tracking-wider", className)} variant={variant} asChild>
      <Link href={link} className="no-underline" style={{ fontSize: 18 }}>
        {t[translateName]}
      </Link>
    </Button>
  );
}
