'use client'

import { urlFor } from "@/sanity/lib/image";
import { getDataUrlFromBlurhash } from "@/utils/blurhash";
import Image from "next/image";

export default function BlurImage(props: {blurhash: string, src: string, alt: string, width: number, height: number, className?: string}) {
  return (
    <Image className={props.className} placeholder="blur" blurDataURL={getDataUrlFromBlurhash(props.blurhash, props.width, props.height)} width={props.width} height={props.height} alt={props.alt} src={props.src}></Image>
  )
}
