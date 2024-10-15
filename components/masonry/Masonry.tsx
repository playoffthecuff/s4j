"use client";

import { Img } from "@/app/[lang]/gallery/page";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function MasonryLayout(props: {
  items: Img[];
  gap: number;
  rounding: number;
}) {
  return (
    <div
      className="w-full columns-sm pt-4"
      style={{ columnGap: props.gap * 4 }}
    >
      {props.items.map((i) => (
        <div
          className="max-h-fit w-full mb-4 break-inside-avoid-column relative"
          key={i.lqip}
        >
          <Image
            className={`rounded-[${props.rounding}px] border mb-${props.gap}`}
            placeholder={i.lqip ? "blur" : undefined}
            blurDataURL={i.lqip || undefined}
            width={i.width < 800 ? i.width * 2 : i.width}
            height={i.width < 800 ? i.height * 2 : i.height}
            alt={i.description}
            src={urlFor(i.image).url()}
          ></Image>
        </div>
      ))}
    </div>
  );
}
