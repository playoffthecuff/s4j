"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { Locale } from "@/i18n-config";
import { useI18n } from "@/lib/utils/i18context";
import clsx from "clsx";
import { MonitorCog, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { EnFlag } from "./EnFlag";
import { RuFlag } from "./RuFlag";

export function SettingsMenu({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const t = useI18n();
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
    setLang(l);
  }, [pathname]);
  function setLight() {
    setTheme("light");
  }
  function setDark() {
    setTheme("dark");
  }
  function setSystem() {
    setTheme("system");
  }
  const p = (e: Event) => e.preventDefault();
  return (
    <div className={clsx(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Settings className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">{t.settings}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent sideOffset={16} className="bg-background/60 backdrop-blur-md text-lg z-20">
                <p>{t.settings}</p>
              </TooltipContent>
            </Tooltip>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          onCloseAutoFocus={p}
          className="w-44 bg-muted p-px tracking-wider"
        >
          <div className="bg-background rounded-md p-0.5">
            <DropdownMenuLabel className="flex justify-between text-muted-foreground text-lg">
              {t.modeTheme}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="mt-0.5 mb-[3px]" />
            <DropdownMenuItem
              onClick={setLight}
              className="cursor-pointer text-lg font-medium"
              disabled={theme === "light"}
              tabIndex={0}
            >
              <div className="flex justify-between w-full items-center">
                <p>{t.light}</p>
                <Sun style={{ width: 20, height: 20 }} />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={setDark}
              className="cursor-pointer text-lg font-medium"
              disabled={theme === "dark"}
              tabIndex={0}
            >
              <div className="flex justify-between w-full items-center">
                <p>{t.dark}</p>
                <Moon style={{ width: 20, height: 20 }} />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={setSystem}
              className="cursor-pointer text-lg font-medium"
              disabled={theme === "system"}
              tabIndex={0}
            >
              <div className="flex justify-between w-full items-center">
                <p>{t.system}</p>
                <MonitorCog style={{ width: 20, height: 20 }} />
              </div>
            </DropdownMenuItem>
          </div>
          <div className="bg-background rounded-md p-0.5 mt-[3px]">
            <DropdownMenuLabel className="flex justify-between text-muted-foreground items-center text-lg">
              {t.language}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="mt-0.5 mb-[3px]" />
            <DropdownMenuItem
              className="cursor-pointer pl-1.5 pr-[5px] font-medium"
              disabled={lang === "en"}
              tabIndex={0}
            >
              <Link
                href={redirectedPathname("en")}
                className="flex items-center justify-between w-full text-lg"
              >
                <p>{t.english}</p>
                <div>
                  <EnFlag style={{ width: 24, height: 24 }} />
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer pl-1.5 pr-[5px] font-medium"
              disabled={lang === "ru"}
              tabIndex={0}
            >
              <Link
                href={redirectedPathname("ru")}
                className="flex items-center justify-between w-full text-lg"
              >
                <p>{t.russian}</p>
                <div>
                  <RuFlag style={{ width: 24, height: 24 }} />
                </div>
              </Link>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
