"use client";

import useScrollDirection from "@/lib/hooks/use-scroll-direction";
import clsx from "clsx";
import { Logo, Navbar, Burger, Settings } from "./children";
import useLocale from "@/lib/hooks/useLocale";

export const pages = ["blog", "gallery", "events", "about"];

export function Header({ svg, }: { svg: string }) {
  const scrollDirection = useScrollDirection();
  const locale = useLocale();
  return (
    <header
      id="header"
      className={clsx(
        "w-screen shadow dark:shadow-night-down fixed z-20 bg-background top-0 left-0 transition-all duration-400",
        scrollDirection === "down" ? "-translate-y-[64px]" : "-translate-y-0",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex gap-10 justify-between">
        <Logo svg={svg} locale={locale} />
        <Navbar
          className="max-[759px]:hidden w-full"
          orientation="horizontal"
          values={pages}
        />
        <Settings className="max-[759px]:hidden relative" />
        <Burger
          className="min760:hidden"
          isClose={scrollDirection === "down"}
        />
      </div>
    </header>
  );
}
