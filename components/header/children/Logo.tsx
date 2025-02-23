import { LogoIcon } from "@/components/icons";
import { Locale } from "@/i18n-config";
import Link from "next/link";

export function Logo({ locale }: { locale: Locale | null }) {
  return (
    <Link href={`/${locale ?? ""}`} aria-label="home link">
      <LogoIcon width={40} height={40} />
    </Link>
  );
}
