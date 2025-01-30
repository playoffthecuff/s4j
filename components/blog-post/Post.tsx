"use client";
import { BlogArticle } from "@/lib/types/sanity-data";
import { PortableText, PortableTextReactComponents } from "next-sanity";
import "./post.css";
import { LinkImage, PaginationNavigation, ShadowViewPort } from "./children";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import useMediaQuery from "@/lib/hooks/use-media-query";
import { FlatDateBlock } from "./children/FlatDateBlock";
import useLocale from "@/lib/hooks/useLocale";

export function BlogPost({
  className,
  data,
  slug,
  prev,
  next,
}: {
  className?: string;
  data: BlogArticle;
  slug: string;
  prev: string | null;
  next: string | null;
}) {
  const locale = useLocale();
  const components: Partial<PortableTextReactComponents> = {
    block: {
      blockComment: (props) => {
        return <span style={{ display: "none" }}>{props.children}</span>;
      },
      blockquote: (props) => {
        return (
          <div>
            <blockquote>{props.children}</blockquote>
          </div>
        );
      },
    },
    marks: {
      marked: (props) => {
        return <mark>{props.children}</mark>;
      },
    },
    types: {
      ref: ({ value }) => {
        return (
          <LinkImage
            href={`/${locale}/blog/${slug}`}
            data={value.imageData}
            className="ml-3 max-[560px]:ml-0 float-right max-[560px]:float-none"
            imgClass={clsx(
              "max-[560px]:w-full max-[560px]:h-auto max-[560px]:max-h-[600px] max-[560px]:object-cover",
              value.imageData.width > value.imageData.height
                ? "max-w-96 h-auto max-[560px]:max-w-full"
                : "h-80 w-auto",
            )}
          />
        );
      },
    },
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const matches = useMediaQuery("(min-width: 560px)");
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const section = container.querySelector("section");
    const { firstElementChild } = container;
    const firstAHeight =
      firstElementChild?.tagName === "A"
        ? (firstElementChild as HTMLAnchorElement).offsetHeight
        : 0;
    const firstP = section?.querySelector("p");

    const paragraphs = container.querySelectorAll("p");
    paragraphs.forEach((p) => {
      const previousAnchor = p.previousElementSibling;
      if (previousAnchor && previousAnchor.tagName === "A" && matches) {
        const anchorHeight = (previousAnchor as HTMLAnchorElement).offsetHeight;
        p.style.minHeight = `${anchorHeight}px`;
      } else {
        p.style.minHeight = "0px";
      }
    });

    const divs = container.querySelectorAll("div");
    divs.forEach((div) => {
      const previousAnchor = div.previousElementSibling;
      if (previousAnchor && previousAnchor.tagName === "A" && matches) {
        const anchorHeight = (previousAnchor as HTMLAnchorElement).offsetHeight;
        div.style.minHeight = `${anchorHeight}px`;
      } else {
        div.style.minHeight = "0px";
      }
    });
    if (firstAHeight && firstP && matches) {
      firstP.style.minHeight = `${firstAHeight}px`;
    } else if (firstP) {
      firstP.style.minHeight = `0px`;
    }
  }, [matches]);

  return (
    <div className={className}>
      <article className="w-full max-w-3xl mx-auto" ref={containerRef}>
        {data && data.titleImageData && (
          <LinkImage
            href={`/${locale}/blog/${slug}`}
            data={data.titleImageData}
            className="mr-3 max-[560px]:mr-0 float-left max-[560px]:float-none"
            imgClass={clsx(
              "max-[560px]:w-full max-[560px]:h-auto max-[560px]:max-h-[600px] max-[560px]:object-cover",
              data.titleImageData.width > data.titleImageData.height
                ? "max-w-96 h-auto max-[560px]:max-w-full"
                : "h-96 w-auto",
            )}
          />
        )}
        <ShadowViewPort />
        {data && (
          <>
            <FlatDateBlock dt={data.publishedAt} className="float-right mt-0.5" />
            <h1 className="text-3xl font-medium mt-6 mb-4">{data.title}</h1>
          </>
        )}
        {data && data.content && (
          <section className="prose dark:prose-invert">
            <PortableText value={data.content} components={components} />
          </section>
        )}
      </article>
      <PaginationNavigation className="pt-16" prev={prev} next={next} />
    </div>
  );
}
