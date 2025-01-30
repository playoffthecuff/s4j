"use client";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui";
import { usePathname } from "next/navigation";
import { RefObject, useEffect, useState } from "react";
import { useI18n } from "@/lib/utils/i18context";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Locale } from "@/i18n-config";
import { EnFlag } from "./EnFlag";
import { RuFlag } from "./RuFlag";
import { useClickOutside } from "@/lib/hooks/use-click-outside";
import { SearchForm } from "./SearchFrom";
import useSmallLandscape from "@/lib/hooks/useSmallLandscape";
import { useTheme } from "next-themes";
import { MonitorCog, Moon, Sun } from "lucide-react";
import useLocale from "@/lib/hooks/useLocale";

export function Sidebar({
  className,
  onTabClick,
  tabbed,
  cb,
  cbRef,
  values,
}: {
  className?: string;
  onTabClick?: () => void;
  tabbed?: boolean;
  cb: () => void;
  cbRef: RefObject<HTMLElement>;
  values: string[];
}) {
  const pathname = usePathname();

  const t = useI18n();
  const [v, setV] = useState(pathname.split("/")[2]);
  useEffect(() => setV(pathname.split("/")[2]), [pathname]);
  // const [lang, setLang] = useState<"ru" | "en">("en");
  // useEffect(() => {
  //   if (!pathname) return;
  //   const segments = pathname.split("/");
  //   const l = segments[1] as Locale;
  //   setLang(l);
  // }, [pathname]);
  const locale = useLocale();

  const close = () => {
    if (cb) cb();
  };
  const { theme, setTheme } = useTheme();
  const [th, setTh] = useState("");
  useEffect(() => {
    if (theme) setTh(theme);
  }, [theme]);
  const setLight = () => {
    setTheme("light");
    close();
  };
  const setDark = () => {
    setTheme("dark");
    close();
  };
  const setSystem = () => {
    setTheme("system");
    close();
  };

  useClickOutside(cbRef, close);
  const isSmallLandscaped = useSmallLandscape(510);
  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <aside
      className={cn(
        "relative p-4 z-20 flex top-0 right-0 flex-col items-center justify-center",
        "rounded-bl-xl shadow-menu bg-background",
        "transform-gpu duration-600 origin-right",
        tabbed ? "scale-x-100" : "scale-x-0",
        className,
      )}
    >
      <div
        className="h-4 w-4 absolute left-0 top-2 -translate-x-3 -translate-y-1"
        style={{
          background:
            "radial-gradient(circle at 0% 100%, transparent 12px, hsl(var(--background)) 0)",
        }}
      />

      <nav className="flex">
        <Tabs
          orientation="vertical"
          value={v}
          className={clsx("relative flex items-center justify-between mx-auto")}
        >
          <TabsList
            className={clsx(
              "flex-col",
              "h-fit select-none flex-1 max-w-none p-0 bg-muted",
              isSmallLandscaped && "flex-row",
            )}
          >
            <div
              className={clsx("p-[5px] w-fit flex flex-col rounded-t-md gap-1")}
            >
              {values.map((el) => (
                <TabsTrigger
                  value={el}
                  disabled={v === el}
                  className="w-full text-base justify-start tracking-wide px-2.5 data-[disabled]:pointer-events-none hover:text-muted-foreground"
                  onClick={onTabClick}
                  asChild
                  key={el}
                >
                  <Link href={`/${locale}/${el}`} tabIndex={tabbed ? 0 : -1} prefetch>
                    {t[el]}
                  </Link>
                </TabsTrigger>
              ))}
              {/* <TabsTrigger
                asChild
                className="w-full text-base justify-start tracking-wide px-2.5 data-[disabled]:pointer-events-none hover:text-muted-foreground"
                value="blog"
                onClick={onTabClick}
                disabled={v === "blog"}
              >
                <Link href="./blog" tabIndex={tabbed ? 0 : -1} prefetch>
                  {t.blog}
                </Link>
              </TabsTrigger>
              <TabsTrigger
                asChild
                className="w-full text-base justify-start tracking-wide px-2.5 data-[disabled]:pointer-events-none hover:text-muted-foreground"
                value="gallery"
                onClick={onTabClick}
                disabled={v === "gallery"}
              >
                <Link href="./gallery" tabIndex={tabbed ? 0 : -1} prefetch>
                  {t.gallery}
                </Link>
              </TabsTrigger>
              <TabsTrigger
                asChild
                className="w-full text-base justify-start tracking-wide px-2.5 data-[disabled]:pointer-events-none hover:text-muted-foreground"
                value="events"
                onClick={onTabClick}
                disabled={v === "events"}
              >
                <Link href="./events" tabIndex={tabbed ? 0 : -1} prefetch>
                  {t.events}
                </Link>
              </TabsTrigger>
              <TabsTrigger
                asChild
                className="w-full text-base justify-start tracking-wide px-2.5 data-[disabled]:pointer-events-none hover:text-muted-foreground"
                value="about"
                onClick={onTabClick}
                disabled={v === "about"}
              >
                <Link href="./about" tabIndex={tabbed ? 0 : -1} prefetch>
                  {t.about}
                </Link>
              </TabsTrigger> */}
              <TabsTrigger
                asChild
                className="w-full p-0 text-base justify-start"
                value="search"
              >
                <SearchForm
                  className={clsx(
                    v === "search" ? "bg-background" : "bg-muted",
                  )}
                  onEnter={close}
                  variant="wide"
                />
              </TabsTrigger>
            </div>
            <div
              className={clsx(
                "w-full gap-0.5 flex flex-col border-x-2 border-b-2 rounded-md",
                isSmallLandscaped && "border-none pr-1 gap-1",
              )}
            >
              <div className="p-1 bg-background rounded-md">
                <TabsTrigger
                  className="w-full flex justify-between text-base tracking-wide pl-2.5 pr-[9px] hover:bg-muted"
                  value="light"
                  onClick={setLight}
                  disabled={th === "light"}
                  tabIndex={0}
                >
                  <p>{t.light}</p>
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                </TabsTrigger>
                <TabsTrigger
                  className="w-full flex justify-between text-base tracking-wide pl-2.5 pr-[9px] hover:bg-muted"
                  value="dark"
                  onClick={setDark}
                  disabled={th === "dark"}
                  tabIndex={0}
                >
                  <p>{t.dark}</p>
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                </TabsTrigger>
                <TabsTrigger
                  className="w-full flex justify-between text-base tracking-wide pl-2.5 pr-[9px] hover:bg-muted"
                  value="system"
                  onClick={setSystem}
                  disabled={th === "system"}
                  tabIndex={0}
                >
                  <p>{t.system}</p>
                  <MonitorCog className="h-[1.2rem] w-[1.2rem]" />
                </TabsTrigger>
              </div>
              <div className="p-1 bg-background rounded-md min-w-40">
                <TabsTrigger
                  asChild
                  className="w-full flex justify-between text-base tracking-wide pl-2.5 pr-[6.5px] hover:bg-muted data-[disabled]:opacity-50 data-[disabled]:pointer-events-none"
                  value="en"
                  disabled={locale === "en"}
                  tabIndex={locale === "en" ? -1 : 0}
                  onClick={onTabClick}
                >
                  <Link
                    href={redirectedPathname("en")}
                    className="flex items-center justify-between w-full"
                  >
                    <p>{t.english}</p>
                    <div>
                      <EnFlag />
                    </div>
                  </Link>
                </TabsTrigger>
                <TabsTrigger
                  asChild
                  className="w-full flex justify-between text-base tracking-wide pl-2.5 pr-[6.5px] hover:bg-muted data-[disabled]:opacity-50 data-[disabled]:pointer-events-none"
                  value="ru"
                  disabled={locale === "ru"}
                  tabIndex={locale === "ru" ? -1 : 0}
                  onClick={onTabClick}
                >
                  <Link
                    href={redirectedPathname("ru")}
                    className="flex items-center justify-between w-full"
                  >
                    <p>{t.russian}</p>
                    <div>
                      <RuFlag />
                    </div>
                  </Link>
                </TabsTrigger>
              </div>
            </div>
          </TabsList>
        </Tabs>
      </nav>
    </aside>
  );
}
