"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui";
import useLocale from "@/lib/hooks/use-locale";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/utils/i18context";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchForm } from "./SearchForm";

export function Navbar({
  orientation,
  className,
  onChange,
  values,
}: {
  orientation: "horizontal" | "vertical";
  className?: string;
  onChange?: () => void;
  tabbed?: boolean;
  values: string[];
}) {
  const pathName = usePathname();
  const t = useI18n();
  const [v, setV] = useState(pathName.split("/")[2]);
  useEffect(() => setV(pathName.split("/")[2] ?? ""), [pathName]);
  const locale = useLocale();
  function handleClick() {
    if (onChange) onChange();
  }

  return (
      <NavigationMenu
        className={cn("flex p-0.5 rounded-md bg-muted", className)}
        orientation={orientation}        value={v}
        tabIndex={-1}
        onClick={handleClick}
      >
        <NavigationMenuList className="font-medium tracking-wider ">
          {values.map((el) => (
            <NavigationMenuItem key={el} tabIndex={0} value={el}>
              <Link href={`/${locale}/${el}`} legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(
                    "group inline-flex h-9 w-max items-center justify-center text-lg rounded-b-sm bg-muted px-3 py-2",
                    "hover:text-muted-foreground focus:bg-accent focus:text-accent-foreground",
                    "aria-disabled:pointer-events-none data-[active]:bg-background data-[active]:text-muted-foreground",
                    "ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50",
                    "transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1"
                  )}
                  active={el === v}
                  aria-disabled={v === el && pathName.split("/").length < 4}
                >
                  {t[el]}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem value="search" className="aria-selected:bg-background" aria-selected={v === "search"}>
            <SearchForm variant="thin" />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
  );
}
