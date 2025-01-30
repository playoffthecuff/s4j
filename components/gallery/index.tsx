"use client";
import { useEffect } from "react";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { Card, CardContent, CardFooter } from "@/components/ui";
import InnerImageZoom from "react-inner-image-zoom";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { ChevronLeft, ChevronRight, Info, X } from "lucide-react";
import { useI18n } from "@/lib/utils/i18context";
import { Img } from "@/lib/types/sanity-data";
import "./iiz.styles.css";
import clsx from "clsx";
import useSizes from "@/lib/hooks/use-sizes";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ShareMenuQuarter } from "../share-menu";
import { InfoButtonPopoverContent } from "../carousel/children";
import { PopoverToggleTooltipButton, TooltipButton } from "../buttons";

export function Gallery({
  image,
  slugs,
  className,
  backLink,
}: {
  image: Img;
  slugs: string[];
  className?: string;
  backLink: string;
}) {
  const t = useI18n();
  const [isStart, isEnd] = [
    slugs[0] === image.slug,
    slugs.at(-1) === image.slug,
  ];
  const { w, h, z, setZ } = useSizes(image);
  const idx = slugs.indexOf(image.slug);
  const prev = slugs[Math.max(idx - 1, 0)];
  const next = slugs[Math.min(idx + 1, slugs.length - 1)];
  const router = useRouter();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && !isStart) router.push(prev);
      if (e.key === "ArrowRight" && !isEnd) router.push(next);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEnd, next, prev, router, isStart]);
  useEffect(() => {
    const header = document.getElementById("header");
    if (header) {
      header.style.boxShadow = "0 1px 8px 0 var(--shadow-color)";
    }
  }, []);
  useEffect(() => {
    const footer = document.getElementById("footer");
    if (footer) footer.style.display = "none";
    return () => {
      if (footer) footer.style.display = "block";
    };
  }, []);
  const afterZoomIn = () => {
    setZ(true);
  };
  const afterZoomOut = () => {
    setZ(false);
  };

  return (
    <div className={cn(className)}>
      <div className="max-w-7xl absolute h-screen w-full">
        <TooltipButton
          text={t.previousTooltip}
          disabled={isStart}
          className={clsx(
            "z-10 left-4 bottom-1/2 absolute translate-y-1/2 bg-background/60 hover:bg-border/60",
            z && "invisible",
          )}
          offset={8}
        >
          <Link
            href={prev}
            scroll={false}
            className="w-full h-full flex items-center justify-center"
            prefetch
          >
            <ChevronLeft />
          </Link>
        </TooltipButton>
        <TooltipButton
          text={t.nextTooltip}
          disabled={isEnd}
          className={clsx(
            "z-10 right-4 bottom-1/2 absolute translate-y-1/2 bg-background/60 hover:bg-border/60",
            z && "invisible",
          )}
          offset={8}
        >
          <Link
            href={next}
            scroll={false}
            className="w-full h-full flex items-center justify-center"
            prefetch
          >
            <ChevronRight />
          </Link>
        </TooltipButton>
        <PopoverToggleTooltipButton
          initIcon={<Info />}
          activeIcon={<X />}
          initText={t.infoTooltip}
          activeText={t.closeTooltip}
          content={<InfoButtonPopoverContent />}
          className={clsx("z-10 left-4 top-4 absolute", z && "invisible")}
          hide={z}
        />
        <TooltipButton
          text={t.closeTooltip}
          className={clsx(
            z && "invisible",
            "z-10 right-4 top-4 absolute bg-background/60 hover:bg-border/60",
          )}
          offset={8}
          side="left"
        >
          <Link
            href={backLink}
            className="w-full h-full flex items-center justify-center"
            prefetch
          >
            <X />
          </Link>
        </TooltipButton>
        <ShareMenuQuarter
          className="absolute right-4 bottom-4"
          text={image.description}
          title={image.description}
        />
      </div>
      <Card className={cn("border-none relative")}>
        <ScrollArea
          className="border w-fit relative mx-auto max-w-full"
          style={{ height: h }}
          type={z ? "scroll" : "always"}
          hidden={z}
        >
          <CardContent className="p-0 w-fit" style={{ height: h }}>
            <InnerImageZoom
              className={clsx(!z && "-top-0.5")}
              src={urlFor(image.image).url()}
              width={w}
              fadeDuration={84}
              hideCloseButton
              hideHint
              afterZoomIn={afterZoomIn}
              afterZoomOut={afterZoomOut}
              fullscreenOnMobile={true}
              mobileBreakpoint={2000}
            />
          </CardContent>
          <CardFooter className="flex-col text-xl items-start w-full p-0 bg-background relative z-10 -bottom-[1px]">
            <figcaption
              className="mx-auto px-3 py-3 max-w-xl flex flex-col"
              style={{
                width: w,
              }}
            >
              {image.title && <h1 className="text-xl">{image.title}</h1>}
              <Separator className="my-2" />
              <div className="text-muted-foreground text-base min-h-12 mr-14">
                {image.description && image.description}
              </div>
            </figcaption>
          </CardFooter>
        </ScrollArea>
      </Card>
    </div>
  );
}
