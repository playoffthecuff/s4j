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
        "mx-auto",
        data.image && "min-h-[340px]",
        className,
      )}
      id="main-info"
    >
      {data.image && (
        <section className="m-4 min-[576px]:m-0 min-[576px]:ml-4 float-right self-center w-full h-full min-[576px]:w-[272px] min-[576px]:h-[272px] relative aspect-square">
          <Image
            placeholder={"blur"}
            blurDataURL={data.image.lqip ?? undefined}
            className="rounded-xl"
            src={data.image.url}
            width={data.image.width}
            height={data.image.height}
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
