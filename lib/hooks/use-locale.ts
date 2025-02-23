import { i18n, Locale } from "@/i18n-config";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function useLocale() {
  const { locales } = i18n;
  const [locale, setLocale] = useState<Locale | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    const firstSegment = pathname.split("/")[1];
    if (locales.some((v) => v === firstSegment))
      setLocale(firstSegment as Locale);
  }, [locales, pathname]);
  return locale;
}
