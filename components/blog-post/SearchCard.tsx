import { SearchedContent } from "@/lib/types/sanity-data";
import { cn } from "@/lib/utils";
import { Image } from "next-sanity/image";
import { LetterText, Image as LucideImage } from "lucide-react";
import { Separator } from "../ui";
import clsx from "clsx";
import { LinkButton } from "../buttons";
import { DateBlock, MarkedText, TooltipIcon } from "./children";
import { ImagePlaceholderIcon } from "../icons";
import getSubstrBeforeAfter from "@/lib/utils/getSubstrBeforeAfter";
import { Locale } from "@/i18n-config";

export function SearchCard({
  className,
  data,
  searchText,
  locale,
  type,
}: {
  className?: string;
  data: SearchedContent;
  searchText: string;
  locale: Locale;
  type: "gallery" | "blog";
}) {
  const textContent = getSubstrBeforeAfter(
    data.text ?? "",
    searchText,
    80,
    400,
    "…",
    "…",
  );
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
            {type === "gallery" && <LucideImage strokeWidth={1.5} className="float-right text-muted-foreground" />}
            {type === "blog" && <LetterText  strokeWidth={1.5} className="float-right text-muted-foreground" />}
            <MarkedText text={data.title} marks={[searchText]} />
          </h2>
          <Separator className="h-0.5 mb-3 mt-2.5" />
          <p
            className={clsx("description text-foreground hyphens-auto", "text")}
            id="card-text"
          >
            <DateBlock dt={data.publishedAt} className="float-right ml-2" />
            <MarkedText text={textContent} marks={[searchText]} />
          </p>
        </div>
        <LinkButton
          className="w-full"
          translateName="readMore"
          variant="secondary"
          link={`/${locale}/${type}/${data.slug}`}
        />
      </section>
    </article>
  );
}
