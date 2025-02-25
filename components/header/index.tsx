"use client";

import useLocale from "@/lib/hooks/use-locale";
import useScrollDirection from "@/components/header/use-scroll-direction";
import clsx from "clsx";
import { Burger, Logo, Navbar, Settings } from "./children";

export const pages = ["blog", "gallery", "events", "about"];

export function Header() {
  const scrollDirection = useScrollDirection();
  const locale = useLocale();
  return (
    <header
      id="header"
      className={clsx(
        "shadow-down dark:shadow-night-down fixed z-20 bg-background top-0 left-0 transition-transform duration-400 w-full",
        scrollDirection === "down" ? "-translate-y-[56px]" : "-translate-y-0"
      )}
    >
      <div>
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-10 justify-between transition-all duration-400">
          <Logo locale={locale} />
          <Navbar
            className="max-md:hidden w-full"
            orientation="horizontal"
            values={pages}
          />
          <Settings className="max-md:hidden relative" />
          <Burger className="md:hidden" />
        </div>
      </div>
    </header>
  );
}
