"use client";
import { Globe } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { type Locale } from "@/i18n-config";
import { useI18n } from "@/lib/utils/i18context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { EnFlag } from "./EnFlag";
import { RuFlag } from "./RuFlag";

export function LangToggler() {
  const pathname = usePathname();
  const t = useI18n();
  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };
  const [lang, setLang] = useState<"ru" | "en">("en");
  useEffect(() => {
    if (!pathname) return;
    const segments = pathname.split("/");
    const l = segments[1] as Locale;
    setLang(l);
  }, [pathname]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2 items-center bg-muted rounded-md pr-2 cursor-pointer outline-1 outline-border">
          <Button variant="outline" size="icon">
            <Globe className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Toggle language</span>
          </Button>
          <div className="w-6">{lang.toUpperCase()}</div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col px-1">
        <DropdownMenuItem
          className={`pl-1 pr-0 py-1 flex justify-between ${lang === "en" ? "order-last" : ""}`}
        >
          <Link
            href={redirectedPathname("en")}
            className="flex items-center justify-between w-[126px]"
          >
            <p>{t.english}</p>
            <div>
              <EnFlag style={{ width: 36, height: 28 }} />
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex pl-1 pr-0 py-1 justify-between">
          <Link
            href={redirectedPathname("ru")}
            className="flex items-center justify-between w-[126px]"
          >
            <p>{t.russian}</p>
            <div>
              <RuFlag style={{ width: 36, height: 28 }} />
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
