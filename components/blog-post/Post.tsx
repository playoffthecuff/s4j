"use client";
import { BlogArticle } from "@/app/[lang]/(with-footer)/blog/[slug]/fetchBlogArticle";
import useMediaQuery from "@/lib/hooks/use-media-query";
import clsx from "clsx";
import { PortableText, PortableTextReactComponents } from "next-sanity";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { LinkImage, PaginationNavigation } from "./children";
import { FlatDateBlock } from "./children/FlatDateBlock";
import "./post.css";

export function BlogPost({
  className,
  data,
  slug,
  prev,
  next,
  paginationStep = 1,
}: {
  className?: string;
  data: BlogArticle;
  slug: string;
  prev: string | null;
  next: string | null;
  paginationStep?: 1 | 2;
}) {
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
            href={`./${slug}`}
            data={value.imageData}
            className="ml-3 max-[560px]:ml-0 float-right max-[560px]:float-none"
            imgClass={clsx(
              "max-[560px]:w-full max-[560px]:h-auto max-[560px]:max-h-[600px] max-[560px]:object-cover",
              value.imageData.width > value.imageData.height
                ? "max-w-96 h-auto max-[560px]:max-w-full"
                : "h-80 w-auto"
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

  const { theme } = useTheme();

  useEffect(() => {
    const lc = data.lightColor;
    const dc = data.darkColor;
    const backgroundColor =
      theme === "light" && lc
        ? `rgba(${lc.r},${lc.g},${lc.b},${lc.a})`
        : theme === "dark" && dc
          ? `rgba(${dc.r},${dc.g},${dc.b},${dc.a})`
          : null;
    const body = document.body;
    if (body) body.style.backgroundColor = backgroundColor ?? "";
    return () => {
      if (body) body.style.backgroundColor = "";
    };
  }, [data.darkColor, data.lightColor, theme]);

  return (
    <div className={className}>
      <article className="w-full max-w-3xl mx-auto" ref={containerRef}>
        {data && data.titleImageData && (
          <LinkImage
            href={`./${slug}`}
            data={data.titleImageData}
            className="mr-3 max-[560px]:mr-0 float-left max-[560px]:float-none"
            imgClass={clsx(
              "max-[560px]:w-full max-[560px]:h-auto max-[560px]:max-h-[600px] max-[560px]:object-cover",
              data.titleImageData.width > data.titleImageData.height
                ? "max-w-96 h-auto max-[560px]:max-w-full"
                : "h-96 w-auto"
            )}
          />
        )}
        {data && (
          <>
            <FlatDateBlock
              dt={data.publishedAt}
              className="float-right mt-0.5"
            />
            <h1 className="text-3xl font-medium mt-6 mb-4 tracking-wide">
              {data.title}
            </h1>
          </>
        )}
        {data && data.content && (
          <section className="prose dark:prose-invert text-lg tracking-wide [&>a>div>img]:mt-1 [&>a>div>img]:mb-0">
            <PortableText value={data.content} components={components} />
          </section>
        )}
      </article>
      <PaginationNavigation className="pt-16" prev={prev} next={next} stepBack={paginationStep}/>
    </div>
  );
}
