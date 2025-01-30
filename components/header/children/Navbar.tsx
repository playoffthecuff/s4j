"use client";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/utils/i18context";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { SearchForm } from "./SearchFrom";
import useLocale from "@/lib/hooks/useLocale";

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
  useEffect(() => setV(pathName.split("/")[2]), [pathName]);
  const locale = useLocale();
  function handleClick() {
    if (onChange) onChange();
  }

  return (
    <nav className={cn("flex", className)}>
      <Tabs
        orientation={orientation}
        value={v}
        className={clsx("relative flex items-center justify-between mx-auto")}
      >
        <TabsList
          className={clsx(
            "h-fit select-none p-0.5 flex-1 max-w-none gap-1",
            orientation === "vertical" && "flex-col gap-4 w-[90px]",
          )}
          onClick={handleClick}
          tabIndex={-1}
        >
          {values.map((el) => (
            <TabsTrigger
              value={el}
              disabled={v === el && pathName.split("/").length < 4}
              className="hover:text-muted-foreground text-base data-[disabled]:pointer-events-none"
              tabIndex={0}
              asChild
              key={el}
            >
              <Link href={`/${locale}/${el}`} prefetch>
                {t[el]}
              </Link>
            </TabsTrigger>
          ))}
          <TabsTrigger className="p-0" value="search">
            <SearchForm />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </nav>
  );
}
