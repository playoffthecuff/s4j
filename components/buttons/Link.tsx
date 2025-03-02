"use client";

import { useI18n } from "@/lib/utils/i18context";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "../ui";
import { Variants } from "../ui/button";

export function LinkButton({
  translateName,
  link,
  className,
  variant,
  ariaLabel,
}: {
  translateName: string;
  link: string;
  variant?: Variants;
  className?: string;
  ariaLabel?: string;
}) {
  const t = useI18n();
  return (
    <Button
      className={clsx("tracking-wider", className)}
      variant={variant}
      asChild
    >
      <Link href={link} className="no-underline" style={{ fontSize: 18 }}>
        <span className="sr-only">{`${t[translateName]}${ariaLabel ? " " + t.ariaAbout + " " + ariaLabel : ""}`}</span>
        <p>{t[translateName]}</p>
      </Link>
    </Button>
  );
}
