"use client";
import { CSSProperties, useEffect, useState } from "react";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { Card, CardContent, CardFooter } from "@/components/ui";
import InnerImageZoom from "react-inner-image-zoom";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Info, X } from "lucide-react";
import { useI18n } from "@/lib/utils/i18context";
import { Img } from "@/lib/types/sanity-data";
import "./iiz.styles.css";
import clsx from "clsx";
import {
  TouchScrollIcon,
  TapIcon,
  LeftClickIcon,
  MouseScrollIcon,
} from "../icons";
import useSizes from "@/lib/hooks/use-sizes";
import { cn } from "@/lib/utils";
import useRange from "@/lib/hooks/use-range";
import { getNext, getPrev } from "./getLinks";
import { useRouter } from "next/navigation";
import { ShareMenuQuadro, ShareMenuQuarter, ShareMenuRect } from "../share-menu";

export function GalleryCarousel({
  images,
  className,
  style,
}: {
  images: Img[];
  className?: string;
  style?: CSSProperties;
}) {
  const t = useI18n();
  const { start, end, i, pathname } = useRange(images);
  const img = images[i];
  const [zoomed, setZoomed] = useState(false);
  const [hinted, setHinted] = useState(false);
  const [w, h] = useSizes(img);
  const router = useRouter();

  const prev = getPrev(pathname);
  const next = getNext(pathname);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && !start) router.push(prev);
      if (e.key === "ArrowRight" && !end) router.push(next);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [end, next, prev, router, start]);

  useEffect(() => {
    const header = document.getElementById("header");
    if (header) {
      header.style.boxShadow = "0 1px 8px 0 var(--shadow-color)";
    }
  }, []);

  const afterZoomIn = () => {
    setZoomed(true);
    setHinted(false);
  };

  const afterZoomOut = () => {
    setZoomed(false);
  };

  const toggleHinted = () => {
    setHinted(!hinted);
  };

  return (
    <Card
      className={cn("border-none absolute left-0 right-0", className)}
      style={style}
    >
      <Button
        variant="outline"
        size="icon"
        disabled={start}
        className={clsx(
          "z-10 left-4 bottom-1/2 absolute translate-y-1/2 bg-background/50 hover:bg-border/70",
          zoomed && "invisible",
        )}
      >
        <Link
          href={prev}
          scroll={false}
          className="w-full h-full flex items-center justify-center"
          prefetch
        >
          <ChevronLeft />
        </Link>
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={end}
        className={clsx(
          "z-10 right-4 bottom-1/2 absolute translate-y-1/2  bg-background/50 hover:bg-border/70",
          zoomed && "invisible",
        )}
      >
        <Link
          href={next}
          scroll={false}
          className="w-full h-full flex items-center justify-center"
          prefetch
        >
          <ChevronRight />
        </Link>
      </Button>
      <Tooltip open={hinted} disableHoverableContent>
        <TooltipTrigger
          asChild
          className={clsx("z-10 left-4 top-4 fixed", zoomed && "invisible")}
        >
          <Button
            variant="outline"
            size="icon"
            className="bg-background/50 hover:bg-border/70"
            onClick={toggleHinted}
          >
            {hinted ? <X /> : <Info />}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={12}
          className={`bg-background/50 backdrop-blur-sm px-2 py-1 rounded-sm z-20 mt-4 pr-3`}
        >
          <p className="flex gap-2 h-16 text-base items-center">
            <div className="[@media(any-hover:hover)]:hidden">
              <TapIcon width={40} height={40} />
            </div>
            <div className="[@media(any-hover:none)]:hidden">
              <LeftClickIcon width={40} height={40} />
            </div>
            {t.zoomClickHintTooltip}
          </p>
          <p className="flex gap-2 h-16 text-base items-center">
            <div className="[@media(any-hover:hover)]:hidden">
              <TouchScrollIcon width={40} height={40} />
            </div>
            <div className="[@media(any-hover:none)]:hidden">
              <MouseScrollIcon width={40} height={40} />
            </div>
            {t.scrollHintTooltip}<br/>{t.description}
          </p>
        </TooltipContent>
      </Tooltip>
      <Button
        variant="outline"
        size="icon"
        className={clsx(
          zoomed && "invisible",
          "z-10 right-4 top-4 fixed bg-background/50 hover:bg-border/70",
        )}
      >
        <Link
          href="/gallery"
          className="w-full h-full flex items-center justify-center"
          prefetch
        >
          <X />
        </Link>
      </Button>
      <ScrollArea
        className="border w-fit relative mx-auto max-w-full"
        style={{ height: h }}
        type={zoomed ? "scroll" : "always"}
        hidden={zoomed}
      >
        <CardContent className="p-0 w-fit" style={{ height: h }}>
          <InnerImageZoom
            src={urlFor(img.image).url()}
            width={w}
            fadeDuration={84}
            hideCloseButton
            hideHint
            afterZoomIn={afterZoomIn}
            afterZoomOut={afterZoomOut}
            fullscreenOnMobile={false}
            mobileBreakpoint={2050}
          />
        </CardContent>
        <CardFooter className="flex-col text-xl items-start w-full p-0 bg-background relative z-10 -bottom-[1px]">
          <div
            className="mx-auto px-3 py-3 max-w-xl flex flex-col"
            style={{
              width: w,
            }}
          >
            {img.title && <h1 className="text-xl">{img.title}</h1>}
            <Separator className="my-2" />
            <figcaption className="text-muted-foreground text-base">
              <div className="float-right pt-1 leading-[0.7]">
                {h > 256 ? (
                  <ShareMenuQuarter
                    text={img.description}
                    title={img.description}
                  />
                ) : h > 232 ? (
                  <ShareMenuQuadro
                    text={img.description}
                    title={img.description}
                  />
                ) : (
                  <ShareMenuRect
                    text={img.description}
                    title={img.description}
                  />
                )}
              </div>
              {img.description && img.description}
            </figcaption>
          </div>
        </CardFooter>
      </ScrollArea>
    </Card>
  );
}
