import { GalleryImage } from "@/app/[lang]/types";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function LinkImage({
  href,
  data,
  className,
  imgClass,
}: {
  href: string;
  data: GalleryImage;
  className?: string;
  imgClass?: string;
}) {
  return (
    <Link
      href={`${href}/${data.slug}`}
      className={cn("block group relative", className)}
    >
      <div>
        <Image
          className={cn(
            "border rounded-md my-0 group-hover:opacity-50 transition-opacity",
            imgClass
          )}
          priority
          src={data.url}
          blurDataURL={data.lqip ?? undefined}
          placeholder={data.lqip ? "blur" : "empty"}
          width={data.width}
          height={data.height}
          alt={data.title || " "}
        />
        <Eye className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-white" />
      </div>
      <div className="text-lg font-normal underline tracking-wide px-1 truncate opacity-100 group-hover:opacity-70 transition-opacity duration-400 text-white">
        {data.title}
      </div>
    </Link>
  );
}
