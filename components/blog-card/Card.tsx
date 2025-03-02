import { BlogLightArticle } from "@/app/[lang]/(with-footer)/blog/fetchBlogArticles";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Eye } from "lucide-react";
import { Image } from "next-sanity/image";
import Link from "next/link";
import { LinkButton } from "../buttons";
import { ImagePlaceholderIcon } from "../icons";
import { Separator } from "../ui";
import { DateBlock, MarkedText } from "./children";
import { Locale } from "@/i18n-config";

export function BlogPostCard({
  className,
  data,
  marks,
  lang,
}: {
  className?: string;
  data: BlogLightArticle;
  marks?: string[];
  lang?: Locale;
}) {
  const textContent = data.content ? data.content.join("").slice(0, 400) : "";
  return (
    <article
      className={cn(
        "border-2 rounded-xl overflow-hidden flex gap-4",
        className
      )}
      data-card-article
    >
      <Link
        href={`./blog/${data.slug}`}
        className="relative flex rounded-lg overflow-hidden group bg-neutral-950 group"
        data-card-figure
        aria-label={`${lang === "en" ? "Read more about" : "Читать далее о"} ${data.title ?? ""}`}
      >
        {data.titleImageData ? (
          <Image
            className="object-cover group-hover:opacity-50 transition-opacity duration-250"
            placeholder={data.titleImageData.lqip ? "blur" : "empty"}
            src={data.titleImageData.url}
            blurDataURL={data.titleImageData.lqip ?? undefined}
            fill
            alt=""
            sizes="(max-width: 1279px) 32vw, (max-width: 979px) 48vw, (max-width: 559px) 96vw, 300px"
          />
        ) : (
          <ImagePlaceholderIcon className="w-full" />
        )}
        <Eye className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-white" />
      </Link>
      <section
        className="flex flex-col flex-1 justify-between gap-4 tracking-wide"
        data-card-section
      >
        <div className="flex flex-col">
          <Link
            href={`./blog/${data.slug}`}
            className="text-foreground hover:text-muted-foreground"
            aria-label={`${lang === "en" ? "Read more about" : "Читать далее о"} ${data.title ?? ""}`}
          >
            <h2 className="text-[22px] font-medium tracking-wider truncate">
              <MarkedText text={data.title} marks={marks} />
            </h2>
          </Link>
          <Separator className="h-0.5 mb-3 mt-2.5" />
          <p
            className={clsx("description text-foreground hyphens-auto text-lg")}
            data-card-text
          >
            <DateBlock dt={data.publishedAt} className="float-right ml-2" />
            <MarkedText text={textContent} marks={marks} />
          </p>
        </div>
        <LinkButton
          className="w-full"
          translateName="readMore"
          ariaLabel={data.title}
          variant="secondary"
          link={`./blog/${data.slug}`}
        />
      </section>
    </article>
  );
}
