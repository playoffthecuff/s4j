import { urlFor } from "@/lib/sanity/image";
import { MainInfoType } from "@/types/sanity-data";
import { PortableText } from "next-sanity";
import Image from "next/image";

export default function MainInfo({
  className,
  data,
}: {
  className?: string;
  data: MainInfoType;
}) {
  return (
    <section className={className}>
      <div
        className={`min-h-[304px] min-h-[${data.image ? 304 : 0}px] mx-auto [&>*]:inline flex flex-col min-[576px]:block`}
      >
        {data.image && (
          <div className="m-4 min-[576px]:m-0 min-[576px]:ml-4 float-right self-center w-full h-full min-[576px]:w-[272px] min-[576px]:h-[272px] relative aspect-square">
            <Image
              placeholder={data.lqip ? "blur" : undefined}
              blurDataURL={data.lqip ?? undefined}
              className="rounded-lg"
              fill
              src={urlFor(data.image).url()}
              alt="author picture"
            />
          </div>
        )}
        <div className="prose dark:prose-invert">
          {data.annotation && <PortableText value={data.annotation} />}
        </div>
      </div>
    </section>
  );
}
