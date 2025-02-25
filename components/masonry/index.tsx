"use client";

import useWindowWidth from "@/components/masonry/use-window-with";
import useMediaQueries from "@/lib/hooks/use-media-queries";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { CommonProps, getRenderData } from "./helpers";

interface Props extends CommonProps {
  className: string;
  rounding: number;
}

export default function Masonry({
  items = [],
  className,
  gap = 12,
  pX = 0,
  rounding = 0,
  blockWidth = 1280,
  aspect = 4 / 3,
  columnsCount = 4,
  rowsByImgCount = 2,
  maxCells = 3,
}: Partial<Props>) {
  const windowWidth = useWindowWidth();
  const spacers = 2 * pX + (columnsCount - 1) * gap;
  const contentWidth = blockWidth - spacers;
  const columnWidth = Math.round((10 * contentWidth) / columnsCount) / 10;
  const queries = useMemo(
    () =>
      Array.from(
        { length: columnsCount - 1 },
        (_, i) =>
          `(max-width: ${columnWidth * (columnsCount - i) + (columnsCount - i - 1) * gap + 2 * pX}px)`
      ),
    [columnsCount, gap, columnWidth, pX]
  );
  const matches = useMediaQueries(queries);
  const { totalBreakPoints, itemsExt } = getRenderData({
    aspect,
    blockWidth,
    columnsCount,
    columnWidth,
    gap,
    items,
    matches,
    maxCells,
    pX,
    rowsByImgCount,
    windowWidth,
  });
  return (
    <div
      className={cn(
        className,
        `grid gap-${gap / 4} px-${pX / 4} grid-flow-dense`
      )}
      style={totalBreakPoints.findLast((v) => v.matches)?.styles}
    >
      {itemsExt.map((i) => (
        <Link
          key={i.slug}
          href={`gallery/${i.slug}`}
          scroll={false}
          className="relative bg-neutral-950 group"
          style={{
            gridRow: `span ${i.rowCells}`,
            gridColumn: `span ${i.columnCells}`,
          }}
        >
          <Image
            className="border group-hover:opacity-50 transition-opacity duration-250 relative object-cover"
            style={{ borderRadius: rounding }}
            placeholder={i.lqip ? "blur" : "empty"}
            blurDataURL={i.lqip ?? undefined}
            fill
            alt={i.description ?? ""}
            sizes={`(max-width: 1280px) ${33 * i.columnCells}vw, (max-width: 980px) ${Math.min(50 * i.columnCells, 100)}vw, (max-width: 680px) 100vw, ${(25 * i.columnCells, 100)}vw`}
            src={i.url}
          />
          <Eye className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-white" />
          <figcaption className="absolute bottom-0 px-3.25 pb-3 w-full leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-white text-lg tracking-wide font-medium">
            {i.title}
          </figcaption>
        </Link>
      ))}
    </div>
  );
}
