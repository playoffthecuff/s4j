"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Img } from "@/types/sanity-data";
import css from "./masonry.module.css";

type Size = "small" | "medium" | "large";
type Fit = "wide" | "square" | "regular" | "tall" | "extra-tall";
interface ImgExt extends Img {
  size: Size;
  fit: Fit;
}

export default function MasonryLayout({
  items,
  gap,
  rounding,
  className,
}: {
  items: Img[];
  gap: number;
  rounding: number;
  className?: string;
}) {
  const sizes = items.map((i) => i.width * i.height);
  const [minSize, maxSize] = [Math.min(...sizes), Math.max(...sizes)];
  const step = minSize + (maxSize - minSize) / 3;
  const [first, second] = [minSize + step, maxSize - step];
  const itemsExt: ImgExt[] = items.map((i) => {
    const s = i.width * i.height;
    const size: Size = s > second ? "large" : s > first ? "medium" : "small";
    const aspect = i.height / i.width;
    const fit: Fit =
      aspect > 1.875
        ? "extra-tall"
        : aspect > 1.325
          ? "tall"
          : aspect > 0.95
            ? "square"
            : aspect > 0.575
              ? "regular"
              : "wide";
    return { ...i, size, fit };
  });
  return (
    <div className={className}>
      <div className={css.masonry}>
        {itemsExt.map((i, idx) => (
          <Link href={`gallery/${idx}`} key={i.lqip} scroll={false} className="bg-neutral-950 group" prefetch>
              <Image
                className={`${i.fit} ${i.size} rounded-[${rounding}px] border group-hover:opacity-40 transition-opacity duration-250 relative`}
                placeholder={i.lqip ? "blur" : undefined}
                blurDataURL={i.lqip ?? undefined}
                fill
                alt={i.description}
                src={urlFor(i.image).url()}
              ></Image>
              <Eye className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-white" />
              <p className="absolute bottom-4 right-1/2 translate-x-1/2 w-11/12 opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-white">
                {i.title}
              </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
