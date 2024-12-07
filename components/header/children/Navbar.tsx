"use client";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/utils/i18context";

export function Navbar({
  orientation,
  className,
  onChange,
  tabbed,
}: {
  orientation: "horizontal" | "vertical";
  className?: string;
  onChange?: () => void;
  tabbed?: boolean;
}) {
  const pathName = usePathname();
  const t = useI18n();
  const [v, setV] = useState(pathName.split("/")[2]);
  useEffect(() => setV(pathName.split("/")[2]), [pathName])

  function handleClick() {
    if (onChange) onChange();
  }

  return (
    <nav
      className={className}
    >
      <Tabs orientation={orientation} value={v} className="relative flex items-center justify-between max-w-7xl mx-auto">
        <TabsList
          className={`${orientation === "vertical" ? "flex-col gap-4 w-[90px]" : ""} h-fit select-none`}
          onClick={handleClick}
        >
          <TabsTrigger
            className={`w-14 ${orientation === "vertical" ? "w-full" : ""}`}
            value="blog"
          >
            <Link href="/blog" tabIndex={tabbed ? 0 : -1} prefetch>
              {t.blog}
            </Link>
          </TabsTrigger>
          <TabsTrigger
            className={`w-[78px] ${orientation === "vertical" ? "w-full" : ""}`}
            value="gallery"
          >
            <Link href="/gallery" tabIndex={tabbed ? 0 : -1} prefetch>
              {t.gallery}
            </Link>
          </TabsTrigger>
          <TabsTrigger
            className={`w-[82px] ${orientation === "vertical" ? "w-full" : ""}`}
            value="events"
          >
            <Link href="/events" tabIndex={tabbed ? 0 : -1} prefetch>
              {t.events}
            </Link>
          </TabsTrigger>
          <TabsTrigger
            className={`w-20 ${orientation === "vertical" ? "w-full" : ""}`}
            value="about"
          >
            <Link href="/about" tabIndex={tabbed ? 0 : -1} prefetch>
              {t.about}
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </nav>
  );
}
