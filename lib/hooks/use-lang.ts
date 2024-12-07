import { Locale } from "@/i18n-config";
import { useState, useEffect } from "react";

export default function useLang(pathname: string) {
  const [lang, setLang] = useState<"ru" | "en">("en");
  useEffect(() => {
    if (!pathname) return;
    const segments = pathname.split("/");
    const l = segments[1] as Locale;
    setLang(l);
  }, [pathname]);
  return lang;
}
