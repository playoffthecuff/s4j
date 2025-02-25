"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui";
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
    <nav className={cn("flex", className)}>
      <Tabs
        orientation={orientation}
        value={v}
        className={clsx("relative flex items-center justify-between mx-auto")}
      >
        <TabsList
          className={clsx(
            "h-fit select-none p-0.5 flex-1 max-w-none gap-1 text-foreground tracking-wider",
            orientation === "vertical" && "flex-col gap-4 w-[90px]"
          )}
          onClick={handleClick}
          tabIndex={-1}
        >
          {values.map((el) => (
            <TabsTrigger
              value={el}
              disabled={v === el && pathName.split("/").length < 4}
              className="hover:text-muted-foreground text-lg data-disabled:pointer-events-none data-[state=active]:text-muted-foreground data-[state=active]:hover:text-foreground py-1"
              tabIndex={0}
              asChild
              key={el}
            >
              <Link href={`/${locale}/${el}`}>
                {t[el]}
              </Link>
            </TabsTrigger>
          ))}
          <TabsTrigger className="p-0" value="search">
            <SearchForm variant="thin"/>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </nav>
  );
}
