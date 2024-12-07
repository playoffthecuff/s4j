import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import { MainInfoType } from "@/lib/types/sanity-data";
import { PortableText } from "next-sanity";
import Image from "next/image";

export function MainInfo({
  className,
  data,
}: {
  className?: string;
  data: MainInfoType;
}) {
  return (
    <article
      className={cn(
        `min-h-[304px] min-h-[${data.image ? 304 : 0}px] mx-auto [&>*]:inline flex flex-col min-[576px]:block`,
        className,
      )}
    >
      {data.image && (
        <section className="m-4 min-[576px]:m-0 min-[576px]:ml-4 float-right self-center w-full h-full min-[576px]:w-[272px] min-[576px]:h-[272px] relative aspect-square">
          <Image
            placeholder={data.lqip ? "blur" : undefined}
            blurDataURL={data.lqip ?? undefined}
            className="rounded-xl"
            fill
            src={urlFor(data.image).url()}
            alt="author picture"
          />
        </section>
      )}
      <section className="prose dark:prose-invert">
        {data.annotation && <PortableText value={data.annotation} />}
      </section>
    </article>
  );
}
