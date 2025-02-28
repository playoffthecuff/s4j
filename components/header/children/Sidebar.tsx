"use client";
import useSmallLandscape from "@/components/header/children/use-small-landscape";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui";
import { Locale } from "@/i18n-config";
import { useClickOutside } from "@/lib/hooks/use-click-outside";
import useLocale from "@/lib/hooks/use-locale";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/utils/i18context";
import clsx from "clsx";
import { MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RefObject, useEffect, useState } from "react";
import { EnFlag } from "./EnFlag";
import { RuFlag } from "./RuFlag";
import { SearchForm } from "./SearchForm";

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
  cbRef: RefObject<HTMLElement | null>;
  values: string[];
}) {
  const pathname = usePathname();

  const t = useI18n();
  const [v, setV] = useState(pathname.split("/")[2]);
  useEffect(() => setV(pathname.split("/")[2]), [pathname]);
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
        className
      )}
    >
      <div
        className="h-4 w-4 absolute left-0 top-2 -translate-x-3 -translate-y-1"
        style={{
          background:
            "radial-gradient(circle at 0% 100%, transparent 12px, hsl(var(--background)) 0)",
        }}
      />
      {/* <div
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
              "h-fit select-none flex-1 max-w-none p-0 bg-muted text-foreground tracking-wider",
              isSmallLandscaped && "flex-row"
            )}
          >
            <div
              className={clsx(
                "p-1.5 w-fit flex flex-col rounded-t-md gap-0.75"
              )}
            >
              {values.map((el) => (
                <TabsTrigger
                  value={el}
                  disabled={v === el}
                  className="w-full text-lg justify-start tracking-wider px-2.5 data-disabled:pointer-events-none hover:text-muted-foreground"
                  onClick={onTabClick}
                  asChild
                  key={el}
                >
                  <Link href={`/${locale}/${el}`} tabIndex={tabbed ? 0 : -1}>
                    {t[el]}
                  </Link>
                </TabsTrigger>
              ))}
              <TabsTrigger
                asChild
                className="w-full p-0 text-lg justify-start"
                value="search"
              >
                <SearchForm
                  className={clsx(
                    v === "search" ? "bg-background" : "bg-muted",
                    isSmallLandscaped && "mt-1"
                  )}
                  onEnter={close}
                  variant="wide"
                />
              </TabsTrigger>
            </div> */}
      <NavigationMenu
        className={cn(
          "p-0.5 rounded-md bg-muted flex-col",
          isSmallLandscaped && "border-none flex-row"
        )}
        orientation="vertical"
        value={v}
        tabIndex={-1}
      >
        <NavigationMenuList className="font-medium tracking-wider">
          <div className={clsx("w-full flex flex-col gap-1.25 p-1 pb-0", isSmallLandscaped && "pl-0.5")}>
            {values.map((el) => (
              <NavigationMenuItem key={el} value={el} className="w-full">
                <Link href={`/${locale}/${el}`} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={clsx(
                      "group h-9 w-full justify-center items-start text-lg rounded-b-sm bg-muted px-2.5 py-2",
                      "hover:text-muted-foreground focus:bg-accent focus:text-accent-foreground",
                      "aria-disabled:pointer-events-none data-[active]:bg-background data-[active]:text-muted-foreground",
                      "ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50",
                      "transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1"
                    )}
                    active={el === v}
                    aria-disabled={v === el}
                    onClick={onTabClick}
                  >
                    {t[el]}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem
              value="search"
              className={clsx(
                "aria-selected:bg-background",
                isSmallLandscaped && "mt-1.5"
              )}
              aria-current={v === "search" ? "page" : undefined}
            >
              <SearchForm variant="wide" />
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
        <NavigationMenuList className={clsx("mt-1 w-full rounded-md block", isSmallLandscaped && "w-40 mt-0")}>
          <div className={clsx("flex flex-col flex-1 w-full bg-background rounded-sm p-1", isSmallLandscaped && "gap-1")}>
            <NavigationMenuItem
              value="light"
              className="h-9 cursor-pointer flex justify-between rounded-sm items-center tracking-wide text-lg font-medium pl-2.5 pr-[9px] hover:bg-muted aria-disabled:pointer-events-none w-full aria-disabled:opacity-50"
              tabIndex={0}
              aria-disabled={th === "light"}
              onClick={setLight}
            >
              <p>{t.light}</p>
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            </NavigationMenuItem>
            <NavigationMenuItem
              value="light"
              className="h-9 cursor-pointer flex justify-between rounded-sm items-center tracking-wide text-lg font-medium pl-2.5 pr-[9px] hover:bg-muted w-full aria-disabled:pointer-events-none aria-disabled:opacity-50"
              tabIndex={0}
              aria-disabled={th === "night"}
              onClick={setLight}
            >
              <p>{t.dark}</p>
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            </NavigationMenuItem>
            <NavigationMenuItem
              value="system"
              onClick={setSystem}
              className="h-9 cursor-pointer flex justify-between rounded-sm items-center tracking-wide text-lg font-medium pl-2.5 pr-[9px] hover:bg-muted w-full aria-disabled:pointer-events-none aria-disabled:opacity-50"
              tabIndex={0}
              aria-disabled={th === "system"}
            >
              <p>{t.system}</p>
              <MonitorCog className="h-[1.2rem] w-[1.2rem]" />
            </NavigationMenuItem>
          </div>
          <div className={clsx("w-full bg-background rounded-sm mt-0.75 flex flex-col p-1", isSmallLandscaped && "gap-1")}>
            <NavigationMenuItem
              value="en"
              className="aria-selected:bg-background w-full rounded-sm pl-2.5 pr-2 h-9 hover:bg-muted aria-disabled:pointer-events-none aria-disabled:opacity-50"
              tabIndex={locale === "en" ? -1 : 0}
              aria-disabled={locale === "en"}
              onClick={onTabClick}
            >
              <Link
                href={redirectedPathname("en")}
                className="flex justify-between items-center w-full h-full tracking-wide text-lg font-medium"
              >
                <p>{t.english}</p>
                <div>
                  <EnFlag />
                </div>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem
              value="ru"
              className="aria-selected:bg-background w-full rounded-sm pl-2.5 pr-2 h-9 hover:bg-muted aria-disabled:pointer-events-none aria-disabled:opacity-50"
              tabIndex={locale === "ru" ? -1 : 0}
              aria-disabled={locale === "ru"}
              onClick={onTabClick}
            >
              <Link
                href={redirectedPathname("ru")}
                className="flex justify-between items-center w-full h-full tracking-wide text-lg font-medium"
              >
                <p>{t.russian}</p>
                <div>
                  <RuFlag />
                </div>
              </Link>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      {/* <Tabs
        orientation="vertical"
        value={v}
        className={clsx(
          "relative w-full gap-0.5 border-x-2 border-b-2 rounded-md",
          isSmallLandscaped && "border-none pr-0.5 pt-0.5 pb-0.5"
        )}
      >
        <TabsList
          className={clsx(
            "flex-col",
            "h-fit select-none flex-1 max-w-none p-0 bg-muted text-foreground tracking-wider",
            isSmallLandscaped && "flex-row"
          )}
        >
          <TabsTrigger
            className="w-full flex justify-between text-lg tracking-wider pl-2.5 pr-[9px] hover:bg-muted"
            value="light"
            onClick={setLight}
            disabled={th === "light"}
            tabIndex={0}
          >
            <p>{t.light}</p>
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          </TabsTrigger>
          <TabsTrigger
            className="w-full flex justify-between text-lg tracking-wider pl-2.5 pr-[9px] hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
            value="dark"
            onClick={setDark}
            disabled={th === "dark"}
            tabIndex={0}
          >
            <p>{t.dark}</p>
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          </TabsTrigger>
          <TabsTrigger
            className="w-full flex justify-between text-lg tracking-wider pl-2.5 pr-[9px] hover:bg-muted"
            value="system"
            onClick={setSystem}
            disabled={th === "system"}
            tabIndex={0}
          >
            <p>{t.system}</p>
            <MonitorCog className="h-[1.2rem] w-[1.2rem]" />
          </TabsTrigger>
        </TabsList>
      </Tabs> */}
      {/* <TabsTrigger
                  asChild
                  className="w-full flex justify-between text-lg tracking-wider pl-2.5 pr-[6.5px] hover:bg-muted data-disabled:opacity-50 data-disabled:pointer-events-none"
                  value="ru"
                  disabled={locale === "ru"}
                  tabIndex={locale === "ru" ? -1 : 0}
                  onClick={onTabClick}
                >
                  <Link
                    href={redirectedPathname("ru")}
                    className="flex items-center justify-between w-full"
                  >
                    <p lang={locale === "en" ? "ru" : "en"}>{t.russian}</p>
                    <div>
                      <RuFlag />
                    </div>
                  </Link>
                </TabsTrigger>
                <TabsTrigger
                  asChild
                  className="w-full flex justify-between text-lg tracking-wider pl-2.5 pr-[6.5px] hover:bg-muted data-disabled:opacity-50 data-disabled:pointer-events-none"
                  value="ru"
                  disabled={locale === "ru"}
                  tabIndex={locale === "ru" ? -1 : 0}
                  onClick={onTabClick}
                >
                  <Link
                    href={redirectedPathname("ru")}
                    className="flex items-center justify-between w-full"
                  >
                    <p lang={locale === "en" ? "ru" : "en"}>{t.russian}</p>
                    <div>
                      <RuFlag />
                    </div>
                  </Link>
                </TabsTrigger> */}
    </aside>
  );
}
