"use client";
import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import RuFlag from "../flags/RuFlag";
import EnFlag from "../flags/EnFlag";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { type Locale } from "@/i18n-config";
import { Langs } from "@/app/[lang]/layout";

export default function LangToggler(props: {langs: Langs}) {
  const pathname = usePathname();
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
    setLang(l)
  }, [pathname])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2 items-center bg-muted rounded-md pr-2 cursor-pointer outline-1 outline-border outline">
          <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Toggle language</span>
          </Button>
          <div className="w-6">{lang.toUpperCase()}</div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex justify-between">
        <Link href={redirectedPathname('en')} className="flex items-center justify-between w-[114px]">
          <p>{props.langs?.english}</p>
          <div className="w-8 h-8 ml-2">
            <EnFlag/>
          </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between">
        <Link href={redirectedPathname('ru')} className="flex items-center justify-between w-[114px]">
          <p>{props.langs?.russian}</p>
          <div className="w-8 h-8 ml-2">
            <RuFlag/>
          </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
