import { MainInfoType } from "@/app/[lang]/(with-footer)/about/fetchAuthor";
import { cn } from "@/lib/utils";
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
      className={cn("mx-auto", data.image && "min-h-[340px]", className)}
      id="main-info"
    >
      {data.image && (
        <figure className="min-[576px]:m-0 min-[576px]:ml-4 mb-4 min-[576px]:mb-0 float-right w-full h-full min-[576px]:w-[272px] min-[576px]:h-[272px] relative aspect-square">
          <Image
            placeholder={data.image.lqip ? "blur" : "empty"}
            blurDataURL={data.image.lqip ?? undefined}
            className="rounded-xl"
            src={data.image.url}
            width={data.image.width}
            height={data.image.height}
            alt="author picture"
          />
        </figure>
      )}
      <section className="prose dark:prose-invert text-lg tracking-wide [&>ul]:list-inside">
        {data.annotation && <PortableText value={data.annotation} />}
      </section>
    </article>
  );
}
