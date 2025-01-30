import { BlogLightArticle } from "@/lib/types/sanity-data";
import { cn } from "@/lib/utils";
import { Image } from "next-sanity/image";
import { Separator } from "../ui";
import clsx from "clsx";
import { LinkButton } from "../buttons";
import { DateBlock, MarkedText } from "./children";
import { ImagePlaceholderIcon } from "../icons";

export function BlogPostCard({
  className,
  data,
  marks,
}: {
  className?: string;
  data: BlogLightArticle;
  marks?: string[];
}) {
  const textContent = data.content ? data.content.join("").slice(0, 400) : "";
  return (
    <article
      className={cn(
        "border-2 rounded-xl overflow-hidden flex gap-4",
        className,
      )}
      id="card-article"
    >
      <figure
        className="relative flex rounded-xl overflow-hidden"
        id="card-figure"
      >
        {data.titleImageData ? (
          <Image
            className="object-cover"
            placeholder="blur"
            src={data.titleImageData.url}
            blurDataURL={data.titleImageData.lqip}
            fill
            alt={data.titleImageData.title}
            sizes="(max-width: 1279px) 400px, (max-width: 979px) 464px, (max-width: 856px) 400px, (max-width: 719px) 334px, (max-width: 579px) 544px, 300px"
          />
        ) : (
          <ImagePlaceholderIcon className="w-full" />
        )}
      </figure>
      <section
        className="flex flex-col flex-1 justify-between gap-4"
        id="card-section"
      >
        <div className="flex flex-col">
          <h2 className="text-xl font-medium text-foreground tracking-wider truncate">
            <MarkedText text={data.title} marks={marks} />
          </h2>
          <Separator className="h-0.5 mb-3 mt-2.5" />
          <p
            className={clsx("description text-foreground hyphens-auto")}
            id="card-text"
          >
            <DateBlock dt={data.publishedAt} className="float-right ml-2" />
            <MarkedText text={textContent} marks={marks} />
          </p>
        </div>
        <LinkButton
          className="w-full"
          translateName="readMore"
          variant="secondary"
          link={`./blog/${data.slug}`}
        />
      </section>
    </article>
  );
}
