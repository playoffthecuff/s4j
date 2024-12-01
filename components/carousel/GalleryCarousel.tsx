"use client";
import { CSSProperties, useEffect, useState } from "react";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { usePathname } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import InnerImageZoom from "react-inner-image-zoom";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Info, X } from "lucide-react";
import ShareMenuQuarter from "../share-menu/ShareMenuQuarter";
import ShareMenuQuadro from "../share-menu/ShareMenuQuadro";
import ShareMenuRect from "../share-menu/ShareMenuRect";
import ScrollIcon from "../icons/scroll";
import TapIcon from "../icons/tap";
import { useI18n } from "@/utils/i18context";
import { Img } from "@/types/sanity-data";
import "./styles.css";


export default function GalleryCarousel({
  images,
  className,
  style,
}: {
  images: Img[];
  className?: string;
  style?: CSSProperties;
}) {
  const pathname = usePathname();
  const t = useI18n();
  const pathArr = pathname.split("/");
  const i = +pathArr[pathArr.length - 1];
  const img = images[i];
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [start, setStart] = useState(i === 0);
  const [end, setEnd] = useState(i === images.length - 1);
  const [zoomed, setZoomed] = useState(false);
  const [hinted, setHinted] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (footer) footer.style.display = "none";
    if (window) {
      setW(
        Math.min(
          window?.innerWidth,
          (img.width * ((window?.innerHeight ?? 0) - 1)) / img.height,
        ),
      );
      setH(
        Math.min(
          window?.innerHeight - 1,
          (window.innerWidth * window?.innerHeight) /
            ((img.width * (window?.innerHeight ?? 0)) / img.height),
        ),
      );
    }
    return () => {
      if (footer) footer.style.display = "block";
    };
  }, [img.width, img.height]);
  useEffect(() => {
    setStart(i === 0);
    setEnd(i === images.length - 1);
  }, [i, images.length]);

  const getPrev = () => {
    const p: (string | number)[] = pathname.split("/");
    p[p.length - 1] = +p[p.length - 1] - 1;
    return p.join("/");
  };
  const getNext = () => {
    const p: (string | number)[] = pathname.split("/");
    p[p.length - 1] = +p[p.length - 1] + 1;
    return p.join("/");
  };
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
    <div className={className} style={style}>
      <Card className="border-none relative">
        <Button
          variant="outline"
          size="icon"
          disabled={start}
          className={`${zoomed ? "invisible" : ""} z-10 left-4 bottom-1/2 absolute translate-y-1/2 bg-background/50 hover:bg-border/70`}
        >
          <Link
            href={getPrev()}
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
          className={`${zoomed ? "invisible" : ""} z-10 right-4 bottom-1/2 absolute translate-y-1/2  bg-background/50 hover:bg-border/70`}
        >
          <Link
            href={getNext()}
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
            className={`${zoomed ? "invisible" : ""} z-10 left-4 top-4 fixed`}
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
            className={`bg-background/50 backdrop-blur-sm px-2 py-1 rounded-sm z-20`}
          >
            <p className="flex gap-2 h-16 text-base items-center">
              <TapIcon width={40} height={40} />
              {t.zoomClickHintTooltip}
            </p>
            <p className="flex gap-2 h-16 text-base items-center">
              <ScrollIcon width={40} height={40} />
              {t.scrollHintTooltip}
            </p>
          </TooltipContent>
        </Tooltip>
        <Button
          variant="outline"
          size="icon"
          className={`${zoomed ? "invisible" : ""} z-10 right-4 top-4 fixed bg-background/50 hover:bg-border/70`}
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
              <div className="text-muted-foreground text-base">
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
              </div>
            </div>
          </CardFooter>
        </ScrollArea>
      </Card>
    </div>
  );
}
