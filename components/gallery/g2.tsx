"use client";

import { Img } from "@/lib/types/sanity-data";
import { useI18n } from "@/lib/utils/i18context";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FullscreenButton,
  PopoverToggleTooltipButton,
  TooltipButton,
} from "../buttons";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Maximize,
  Minimize,
  X,
} from "lucide-react";
import { InfoButtonPopoverContent } from "../carousel/children";
import { ShareMenuQuarter } from "../share-menu";
import { Separator } from "../ui";
import throttle from "@/lib/utils/throttle";
import { getSizes } from "./children/helpers";
import clamp from "@/lib/utils/clamp";
import TransitionLink from "../transition-link";
import sleep from "@/lib/utils/sleep";
import BreadCrumbs, { BreadCrumbLink } from "../bread-crumbs/BreadCrumbs";

export function G2({
  data,
  slugs,
  className,
  backLink,
  bcLinks,
  menuLinks,
}: {
  data: Img;
  slugs: string[];
  className?: string;
  backLink: string;
  bcLinks: BreadCrumbLink[];
  menuLinks: string[];
}) {
  const t = useI18n();
  const [zoomable, setZoomable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftControlRef = useRef<HTMLDivElement>(null);
  const rightControlRef = useRef<HTMLDivElement>(null);
  const zoomControlRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  const interfaceRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const zoomContainerRef = useRef<HTMLDivElement>(null);
  const zoomImageRef = useRef<HTMLImageElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const isZoomedRef = useRef<boolean | null>(null);
  // const isFullscreenedRef = useRef<boolean | null>(null);
  // const [bounds, setBounds] = useState({ minX: 0, maxX: 0, minY: 0, maxY: 0 });
  const boundsRef = useRef({ minX: 0, maxX: 0, minY: 0, maxY: 0 });
  // const [kx, setKx] = useState(1);
  // const [ky, setKy] = useState(1);
  const kxRef = useRef<number>(1);
  const kyRef = useRef<number>(1);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const zoomContainerCursorRef = useRef("");
  const idx = slugs.indexOf(data.slug);
  const first = slugs[0];
  const last = slugs.at(-1)!;
  const prev = idx > 0 ? slugs[idx - 1] : last;
  const next = idx < slugs.length - 1 ? slugs[idx + 1] : first;
  const router = useRouter();
  // const locale = useLocale();
  router.prefetch(prev);
  router.prefetch(next);
  const hideMain = () => {
    if (leftControlRef.current) leftControlRef.current.style.cursor = "none";
    if (rightControlRef.current) rightControlRef.current.style.cursor = "none";
    if (imageRef.current) imageRef.current.style.cursor = "none";
    const main = document.querySelector("main");
    if (main) main.style.opacity = "0";
  };
  const goPrev = async () => {
    hideMain();
    await sleep(100);
    router.push(prev);
  };
  const goNext = async () => {
    hideMain();
    await sleep(100);
    router.push(next);
  };
  const setTranslate = (x: number, y: number) => {
    if (zoomImageRef.current)
      zoomImageRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const showZoomedImg: MouseEventHandler<HTMLElement> = (e) => {
    const figure = figureRef.current;
    const img = imageRef.current;
    if (img && figure) {
      const { width } = getSizes(
        figure.offsetWidth,
        img.offsetHeight,
        data.image.width,
        data.image.height,
      );
      const k = width / img.offsetWidth;
      const centerX = figure.offsetWidth / 2;
      const centerY = figure.offsetHeight / 2;
      const clientX = e.clientX;
      const clientY = e.clientY;
      const d2x = centerX - (centerX - clientX) * k;
      const d2y = centerY - (centerY - clientY) * k;
      const dx = clientX - d2x;
      const dy = clientY - d2y;
      lastMousePositionRef.current.x = clientX;
      lastMousePositionRef.current.y = clientY;
      const translateX = clamp(
        dx,
        boundsRef.current.minX,
        boundsRef.current.maxX,
      );
      const translateY = clamp(
        dy,
        boundsRef.current.minY,
        boundsRef.current.maxY,
      );
      lastPositionRef.current.x = translateX;
      lastPositionRef.current.y = translateY;
      setTranslate(translateX, translateY);
    }
    const z = zoomContainerRef.current;
    const i = interfaceRef.current;
    const f = figureRef.current;
    if (z && i && f) {
      z.style.visibility = "visible";
      z.style.opacity = "1";
      i.style.opacity = "0";
      f.style.opacity = "0";
    }
    isZoomedRef.current = true;
    if (document.body) document.body.style.overflowY = "hidden";
  };
  const hideZoomedImg = () => {
    const z = zoomContainerRef.current;
    const i = interfaceRef.current;
    const f = figureRef.current;
    if (z && i && f) {
      z.style.opacity = "";
      setTimeout(() => {
        z.style.visibility = "";
      }, 400);
      i.style.opacity = "";
      f.style.opacity = "";
    }
    if (document.body) document.body.style.overflowY = "";
    isZoomedRef.current = false;
    // if (document.fullscreenElement) document.exitFullscreen();
  };
  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const deltaX = e.clientX - lastMousePositionRef.current.x;
    const deltaY = e.clientY - lastMousePositionRef.current.y;
    lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
    lastPositionRef.current = {
      x: clamp(
        lastPositionRef.current.x - deltaX * kxRef.current,
        boundsRef.current.minX,
        boundsRef.current.maxX,
      ),
      y: clamp(
        lastPositionRef.current.y - deltaY * kyRef.current,
        boundsRef.current.minY,
        boundsRef.current.maxY,
      ),
    };
    if (animationFrameIdRef.current === null) {
      animationFrameIdRef.current = requestAnimationFrame(() => {
        setTranslate(lastPositionRef.current.x, lastPositionRef.current.y);
        animationFrameIdRef.current = null;
      });
    }
  };
  let isAnimating = false;
  const handleKeyMove = (direction: "up" | "down" | "right" | "left") => {
    if (isAnimating) return;
    const duration = 160;
    const startTime = performance.now();
    isAnimating = true;
    const startPosition = { ...lastPositionRef.current };
    const targetPosition = { ...startPosition };

    if (direction === "right") targetPosition.x -= 128;
    if (direction === "left") targetPosition.x += 128;
    if (direction === "up") targetPosition.y += 128;
    if (direction === "down") targetPosition.y -= 128;

    targetPosition.x = clamp(
      targetPosition.x,
      boundsRef.current.minX,
      boundsRef.current.maxX,
    );
    targetPosition.y = clamp(
      targetPosition.y,
      boundsRef.current.minY,
      boundsRef.current.maxY,
    );

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const x =
        startPosition.x + (targetPosition.x - startPosition.x) * progress;
      const y =
        startPosition.y + (targetPosition.y - startPosition.y) * progress;

      setTranslate(x, y);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        lastPositionRef.current = { x: targetPosition.x, y: targetPosition.y };
        isAnimating = false;
      }
    };

    requestAnimationFrame(animate);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMousePositionRef.current.x;
    const deltaY = touch.clientY - lastMousePositionRef.current.y;
    lastMousePositionRef.current = { x: touch.clientX, y: touch.clientY };

    lastPositionRef.current = {
      x: clamp(
        lastPositionRef.current.x + deltaX,
        boundsRef.current.minX,
        boundsRef.current.maxX,
      ),
      y: clamp(
        lastPositionRef.current.y + deltaY,
        boundsRef.current.minY,
        boundsRef.current.maxY,
      ),
    };
    setTranslate(lastPositionRef.current.x, lastPositionRef.current.y);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      lastMousePositionRef.current = { x: touch.clientX, y: touch.clientY };
    }
  };
  const handleMaximize = () => {
    if (document.documentElement) document.documentElement.requestFullscreen();
    // showZoomedImg(e);
  };
  const handleMinimize = () => {
    if (document) document.exitFullscreen();
    // showZoomedImg(e);
  };

  useEffect(() => {
    setZoomable(document.fullscreenEnabled);
  }, []);
  // useEffect(() => {
  //   // const header = document.getElementById("header");
  //   // if (header) {
  //   //   headerTimeoutRef.current = setTimeout(
  //   //     () => (header.style.transform = "translateY(-64px)"),
  //   //     100,
  //   //   );
  //   // }
  //   // const leftControl = leftControlRef.current;
  //   // const rightControl = rightControlRef.current;
  //   // const zoomControl = zoomControlRef.current;
  //   // const container = containerRef.current;
  //   // if (!container || !leftControl || !rightControl || !zoomControl) return;
  //   // const hideControls = () => {
  //   //   hideTimeoutRef.current = setTimeout(() => {
  //   //     leftControl.style.cursor = "none";
  //   //     rightControl.style.cursor = "none";
  //   //     zoomControl.style.cursor = "none";
  //   //     const zoomContainer = zoomContainerRef.current;
  //   //     if (zoomContainer) zoomContainer.style.cursor = "none";
  //   //   }, 2000);
  //   // };
  //   // const showControls = () => {
  //   //   leftControl.style.cursor = "";
  //   //   rightControl.style.cursor = "";
  //   //   zoomControl.style.cursor = "";
  //   //   const zoomContainer = zoomContainerRef.current;
  //   //   if (zoomContainer)
  //   //     zoomContainer.style.cursor = zoomContainerCursorRef.current;
  //   //   if (hideTimeoutRef.current) {
  //   //     clearTimeout(hideTimeoutRef.current);
  //   //     hideTimeoutRef.current = null;
  //   //   }
  //   // };
  //   // const hideHeader = () => {
  //   //   header.style.transform = "translateY(-64px)";
  //   // };
  //   // const showHeader = () => {
  //   //   header.style.transform = "translateY(0px)";
  //   //   if (headerTimeoutRef.current) {
  //   //     clearTimeout(headerTimeoutRef.current);
  //   //     headerTimeoutRef.current = null;
  //   //   }
  //   // };

  //   // const handleMouseMove = (e: MouseEvent) => {
  //   //   if (
  //   //     Math.round(lastMousePositionRef.current.x - e.clientX) > 1 ||
  //   //     Math.round(lastMousePositionRef.current.y - e.clientY) > 1
  //   //   ) {
  //   //     showControls();
  //   //     hideControls();
  //   //   }
  //   //   lastMousePositionRef.current.x = e.clientX;
  //   //   lastMousePositionRef.current.y = e.clientY;
  //   // };
  //   // const handleScrollEnd = () => {
  //   //   if (
  //   //     typeof window !== undefined &&
  //   //     window.scrollY + window.innerHeight + 4 >= document.body.offsetHeight
  //   //   ) {
  //   //     showHeader();
  //   //   } else {
  //   //     hideHeader();
  //   //   }
  //   // };

  //   // const showZoomedImg = () => {
  //   //   const figure = figureRef.current;
  //   //   const img = imageRef.current;
  //   //   if (img && figure) {
  //   //     const { width } = getSizes(
  //   //       figure.offsetWidth,
  //   //       img.offsetHeight,
  //   //       data.image.width,
  //   //       data.image.height,
  //   //     );
  //   //     const k = width / img.offsetWidth;
  //   //     const centerX = figure.offsetWidth / 2;
  //   //     const centerY = figure.offsetHeight / 2;
  //   //     const clientX = lastMousePositionRef.current.x;
  //   //     const clientY = lastMousePositionRef.current.y;
  //   //     const d2x = centerX - (centerX - clientX) * k;
  //   //     const d2y = centerY - (centerY - clientY) * k;
  //   //     const dx = clientX - d2x;
  //   //     const dy = clientY - d2y;
  //   //     const translateX = clamp(
  //   //       dx,
  //   //       boundsRef.current.minX,
  //   //       boundsRef.current.maxX,
  //   //     );
  //   //     const translateY = clamp(
  //   //       dy,
  //   //       boundsRef.current.minY,
  //   //       boundsRef.current.maxY,
  //   //     );
  //   //     lastPositionRef.current.x = translateX;
  //   //     lastPositionRef.current.y = translateY;
  //   //     setTranslate(translateX, translateY);
  //   //   }
  //   //   const z = zoomContainerRef.current;
  //   //   const i = interfaceRef.current;
  //   //   const f = figureRef.current;
  //   //   if (z && i && f) {
  //   //     z.style.visibility = "visible";
  //   //     z.style.opacity = "1";
  //   //     i.style.opacity = "0";
  //   //     f.style.opacity = "0";
  //   //   }
  //   //   isZoomedRef.current = true;
  //   //   if (document.body) document.body.style.overflowY = "hidden";
  //   // };
  //   // const hideZoomedImg = () => {
  //   //   const z = zoomContainerRef.current;
  //   //   const i = interfaceRef.current;
  //   //   const f = figureRef.current;
  //   //   if (z && i && f) {
  //   //     z.style.opacity = "";
  //   //     setTimeout(() => {
  //   //       z.style.visibility = "";
  //   //     }, 400);
  //   //     i.style.opacity = "";
  //   //     f.style.opacity = "";
  //   //   }
  //   //   if (document.body) document.body.style.overflowY = "";
  //   //   isZoomedRef.current = false;
  //   //   if (document.fullscreenElement) document.exitFullscreen();
  //   // };
  //   // const handleKeyDown = (e: KeyboardEvent) => {
  //   //   if (e.key === "Escape") {
  //   //     if (document.fullscreenElement) document.exitFullscreen();
  //   //   }
  //   //   if (e.key === "Enter") {
  //   //     if (isZoomedRef.current) {
  //   //       hideZoomedImg();
  //   //     } else {
  //   //       showZoomedImg();
  //   //     }
  //   //   }
  //   //   if (slugs.length <= 1) return;
  //   //   if (e.key === "ArrowLeft") {
  //   //     if (isZoomedRef.current) {
  //   //       handleKeyMove("left");
  //   //     } else {
  //   //       goPrev();
  //   //     }
  //   //   }
  //   //   if (e.key === "ArrowRight") {
  //   //     if (isZoomedRef.current) {
  //   //       handleKeyMove("right");
  //   //     } else {
  //   //       goNext();
  //   //     }
  //   //   }
  //   //   if (e.key === "ArrowUp") {
  //   //     if (isZoomedRef.current) handleKeyMove("up");
  //   //   }
  //   //   if (e.key === "ArrowDown") {
  //   //     if (isZoomedRef.current) handleKeyMove("down");
  //   //   }
  //   //   // if (e.key === "Escape") {
  //   //   //   if (isZoomedRef.current) {
  //   //   //     hideZoomedImg();
  //   //   //   } else {
  //   //   //     showHeader();
  //   //   //     goBack();
  //   //   //   }
  //   //   // }
  //   //   if (e.key === "F11") {
  //   //     e.preventDefault();
  //   //     if (document.documentElement) {
  //   //       document.documentElement.requestFullscreen();
  //   //     }
  //   //   }
  //   // };

  //   // const goPrev = async () => {
  //   //   hideMain();
  //   //   if (document.body) document.body.style.overflowY = "";
  //   //   await sleep(100);
  //   //   router.push(prev);
  //   // };
  //   // const goNext = async () => {
  //   //   hideMain();
  //   //   if (document.body) document.body.style.overflowY = "";
  //   //   await sleep(100);
  //   //   router.push(next);
  //   // };
  //   // const goBack = () => router.push(backLink);
  //   // const handleFullscreenChange = () => {
  //   //   const body = document.body;
  //   //   if (body) {
  //   //     if (document.fullscreenElement) {
  //   //       body.setAttribute("data-fullscreened", "1");
  //   //     } else {
  //   //       body.removeAttribute("data-fullscreened");
  //   //     }
  //   //   }
  //   // };

  //   // const updateSize = () => {
  //   //   if (typeof window !== undefined) {
  //   //     const windowWidth = window.innerWidth;
  //   //     const windowHeight = window.innerHeight;
  //   //     const { width, height } = getSizes(
  //   //       windowWidth,
  //   //       windowHeight,
  //   //       data.image.width,
  //   //       data.image.height,
  //   //     );
  //   //     const zoomContainer = zoomContainerRef.current;
  //   //     let dx = 0;
  //   //     let dy = 0;
  //   //     if (zoomContainer) {
  //   //       // setKx(zoomContainer.offsetWidth / windowWidth);
  //   //       // setKy(zoomContainer.offsetHeight / windowHeight);
  //   //       kxRef.current = zoomContainer.offsetWidth / windowWidth;
  //   //       kyRef.current = zoomContainer.offsetHeight / windowHeight;
  //   //       // dx = (windowWidth - zoomContainer.offsetWidth) / 2;
  //   //       dx = (windowWidth - width) / 2;
  //   //       // dy = (windowHeight - zoomContainer.offsetHeight) / 2;
  //   //       dy = (windowHeight - height) / 2;
  //   //       zoomContainer.style.width = `${width}px`;
  //   //       zoomContainer.style.height = `${height}px`;
  //   //       zoomContainer.style.left = `${dx}px`;
  //   //       zoomContainer.style.top = `${dy}px`;
  //   //       const windowAspect = windowWidth / windowHeight;
  //   //       const imageAspect = data.image.width / data.image.height;
  //   //       zoomContainerCursorRef.current =
  //   //         (data.image.height > windowHeight &&
  //   //           data.image.width > windowWidth) ||
  //   //         imageAspect === windowAspect
  //   //           ? "move"
  //   //           : imageAspect > windowAspect
  //   //             ? "ew-resize"
  //   //             : "ns-resize";
  //   //       // const cursor =
  //   //       //   (image.height > windowHeight && image.width > windowWidth) ||
  //   //       //   imageAspect === windowAspect
  //   //       //     ? "move"
  //   //       //     : imageAspect > windowAspect
  //   //       //       ? "ew-resize"
  //   //       //       : "ns-resize";
  //   //       zoomContainer.style.cursor = zoomContainerCursorRef.current;
  //   //       setTranslate(0, 0);
  //   //     }

  //   //     // setBounds({
  //   //     //   minX: Math.min(0 - dx, windowWidth - width - dx),
  //   //     //   maxX: -dx,
  //   //     //   minY: Math.min(0 - dy, windowHeight - height - dy),
  //   //     //   maxY: -dy,
  //   //     // });
  //   //     boundsRef.current = {
  //   //       minX: Math.min(0 - dx, windowWidth - width - dx),
  //   //       maxX: -dx,
  //   //       minY: Math.min(0 - dy, windowHeight - height - dy),
  //   //       maxY: -dy,
  //   //     };
  //   //   }
  //   // };
  //   if (typeof window !== undefined) {
  //     // updateSize();
  //     // if (document.body.dataset.fullscreened) showZoomedImg();
  //     // window.addEventListener("resize", updateSize);
  //     // window.addEventListener("keydown", handleKeyDown);
  //     // container.addEventListener("mousemove", throttle(handleMouseMove, 50));
  //     // window.addEventListener("scrollend", handleScrollEnd);
  //     // window.addEventListener("fullscreenchange", handleFullscreenChange);
  //   }
  //   return () => {
  //     // container.removeEventListener("mousemove", handleMouseMove);
  //     // window.removeEventListener("scrollend", handleScrollEnd);
  //     // window.removeEventListener("keydown", handleKeyDown);
  //     // window.removeEventListener("resize", updateSize);
  //     // window.removeEventListener("fullscreenchange", handleFullscreenChange);
  //     // if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
  //     // if (headerTimeoutRef.current) clearTimeout(headerTimeoutRef.current);
  //   };
  // }, [
  //   backLink,
  //   // data.image.height,
  //   // data.image.width,
  //   // next,
  //   // prev,
  //   // router,
  //   // slugs.length,
  // ]);

  useEffect(() => {
    const leftControl = leftControlRef.current;
    const rightControl = rightControlRef.current;
    const zoomControl = zoomControlRef.current;
    const container = containerRef.current;
    if (!container || !leftControl || !rightControl || !zoomControl) return;
    const hideControls = () => {
      hideTimeoutRef.current = setTimeout(() => {
        leftControl.style.cursor = "none";
        rightControl.style.cursor = "none";
        zoomControl.style.cursor = "none";
        const zoomContainer = zoomContainerRef.current;
        if (zoomContainer) zoomContainer.style.cursor = "none";
      }, 2000);
    };
    const showControls = () => {
      leftControl.style.cursor = "";
      rightControl.style.cursor = "";
      zoomControl.style.cursor = "";
      const zoomContainer = zoomContainerRef.current;
      if (zoomContainer)
        zoomContainer.style.cursor = zoomContainerCursorRef.current;
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (
        Math.round(lastMousePositionRef.current.x - e.clientX) > 1 ||
        Math.round(lastMousePositionRef.current.y - e.clientY) > 1
      ) {
        showControls();
        hideControls();
      }
      if (!isZoomedRef.current) {
        lastMousePositionRef.current.x = e.clientX;
        lastMousePositionRef.current.y = e.clientY;
      }
    };
    container.addEventListener("mousemove", throttle(handleMouseMove, 50));

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const header = document.getElementById("header");
    if (header) {
      headerTimeoutRef.current = setTimeout(
        () => (header.style.transform = "translateY(-64px)"),
        100,
      );
    }
    if (!header) return;
    const hideHeader = () => {
      header.style.transform = "translateY(-64px)";
    };
    const showHeader = () => {
      header.style.transform = "translateY(0px)";
      if (headerTimeoutRef.current) {
        clearTimeout(headerTimeoutRef.current);
        headerTimeoutRef.current = null;
      }
    };
    const handleScrollEnd = () => {
      if (
        typeof window !== undefined &&
        window.scrollY + window.innerHeight + 4 >= document.body.offsetHeight
      ) {
        showHeader();
      } else {
        hideHeader();
      }
    };
    window.addEventListener("scrollend", handleScrollEnd);
    return () => {
      window.removeEventListener("scrollend", handleScrollEnd);
      if (headerTimeoutRef.current) clearTimeout(headerTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    const showZoomedImg = () => {
      const figure = figureRef.current;
      const img = imageRef.current;
      if (img && figure) {
        const { width } = getSizes(
          figure.offsetWidth,
          img.offsetHeight,
          data.image.width,
          data.image.height,
        );
        const k = width / img.offsetWidth;
        const centerX = figure.offsetWidth / 2;
        const centerY = figure.offsetHeight / 2;
        const clientX = lastMousePositionRef.current.x;
        const clientY = lastMousePositionRef.current.y;
        const d2x = centerX - (centerX - clientX) * k;
        const d2y = centerY - (centerY - clientY) * k;
        const dx = clientX - d2x;
        const dy = clientY - d2y;
        const translateX = clamp(
          dx,
          boundsRef.current.minX,
          boundsRef.current.maxX,
        );
        const translateY = clamp(
          dy,
          boundsRef.current.minY,
          boundsRef.current.maxY,
        );
        lastPositionRef.current.x = translateX;
        lastPositionRef.current.y = translateY;
        setTranslate(translateX, translateY);
      }
      const z = zoomContainerRef.current;
      const i = interfaceRef.current;
      const f = figureRef.current;
      if (z && i && f) {
        z.style.visibility = "visible";
        z.style.opacity = "1";
        i.style.opacity = "0";
        f.style.opacity = "0";
      }
      isZoomedRef.current = true;
      if (document.body) document.body.style.overflowY = "hidden";
    };
    const hideZoomedImg = () => {
      const z = zoomContainerRef.current;
      const i = interfaceRef.current;
      const f = figureRef.current;
      if (z && i && f) {
        z.style.opacity = "";
        setTimeout(() => {
          z.style.visibility = "";
        }, 400);
        i.style.opacity = "";
        f.style.opacity = "";
      }
      if (document.body) document.body.style.overflowY = "";
      isZoomedRef.current = false;
      if (document.fullscreenElement) document.exitFullscreen();
    };
    const goPrev = async () => {
      hideMain();
      if (document.body) document.body.style.overflowY = "";
      await sleep(100);
      router.push(prev);
    };
    const goNext = async () => {
      hideMain();
      if (document.body) document.body.style.overflowY = "";
      await sleep(100);
      router.push(next);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.fullscreenElement) document.exitFullscreen();
      }
      if (e.key === "Enter") {
        if (isZoomedRef.current) {
          hideZoomedImg();
        } else {
          showZoomedImg();
        }
      }
      if (slugs.length <= 1) return;
      if (e.key === "ArrowLeft") {
        if (isZoomedRef.current) {
          handleKeyMove("left");
        } else {
          goPrev();
        }
      }
      if (e.key === "ArrowRight") {
        if (isZoomedRef.current) {
          handleKeyMove("right");
        } else {
          goNext();
        }
      }
      if (e.key === "ArrowUp") {
        if (isZoomedRef.current) handleKeyMove("up");
      }
      if (e.key === "ArrowDown") {
        if (isZoomedRef.current) handleKeyMove("down");
      }
      if (e.key === "F11") {
        e.preventDefault();
        if (document.documentElement) {
          document.documentElement.requestFullscreen();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev, router, slugs.length]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const body = document.body;
      if (body) {
        if (document.fullscreenElement) {
          body.setAttribute("data-fullscreened", "1");
        } else {
          body.removeAttribute("data-fullscreened");
        }
      }
    };
    window.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      window.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (typeof window !== undefined) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const { width, height } = getSizes(
          windowWidth,
          windowHeight,
          data.image.width,
          data.image.height,
        );
        const zoomContainer = zoomContainerRef.current;
        let dx = 0;
        let dy = 0;
        if (zoomContainer) {
          kxRef.current = zoomContainer.offsetWidth / windowWidth;
          kyRef.current = zoomContainer.offsetHeight / windowHeight;
          dx = (windowWidth - width) / 2;
          dy = (windowHeight - height) / 2;
          zoomContainer.style.width = `${width}px`;
          zoomContainer.style.height = `${height}px`;
          zoomContainer.style.left = `${dx}px`;
          zoomContainer.style.top = `${dy}px`;
          const windowAspect = windowWidth / windowHeight;
          const imageAspect = data.image.width / data.image.height;
          zoomContainerCursorRef.current =
            (data.image.height > windowHeight &&
              data.image.width > windowWidth) ||
            imageAspect === windowAspect
              ? "move"
              : imageAspect > windowAspect
                ? "ew-resize"
                : "ns-resize";
          zoomContainer.style.cursor = zoomContainerCursorRef.current;
          setTranslate(0, 0);
        }
        boundsRef.current = {
          minX: Math.min(0 - dx, windowWidth - width - dx),
          maxX: -dx,
          minY: Math.min(0 - dy, windowHeight - height - dy),
          maxY: -dy,
        };
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [data.image.height, data.image.width]);

  const tooltipStyle = {
    backgroundColor: "hsl(var(--background) / 0.6)",
    backdropFilter:
      "blur(12px) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
    fontSize: "16px",
  };

  return (
    <div className={className} ref={containerRef}>
      <div className="w-full h-[calc(100vh-2rem)] fixed left-0 top-0 z-10 flex">
        <div
          className="w-1/3 h-full cursor-chevron-left"
          ref={leftControlRef}
          onClick={goPrev}
        />
        <div
          className="w-1/3 h-full cursor-custom-zoom-in"
          ref={zoomControlRef}
          onClick={showZoomedImg}
        />
        <div
          className="w-1/3 h-full cursor-chevron-right"
          ref={rightControlRef}
          onClick={goNext}
        />
      </div>
      <div className="fixed top-0 right-1/2 px-4 pt-2 pb-6 z-10 w-full max-w-7xl translate-x-1/2 text-right">
        <PopoverToggleTooltipButton
          tooltipSide="left"
          initIcon={<Info />}
          activeIcon={<X />}
          initText={t.infoTooltip}
          activeText={t.closeTooltip}
          content={<InfoButtonPopoverContent />}
        />
      </div>
      <div>
        <figure
          className="flex items-center h-screen w-screen transition-opacity duration-400"
          ref={figureRef}
        >
          <Image
            alt={data.title}
            src={data.image.url}
            className="max-w-[100vw] left-[50vw] -translate-x-1/2 object-contain bg-background w-auto h-screen cursor-custom-zoom-in fixed"
            ref={imageRef}
            width={data.image.width}
            height={0}
            placeholder={data.image.lqip ? "blur" : "empty"}
            blurDataURL={data.image.lqip ?? ""}
          />
        </figure>
        <div
          className="relative z-10 transition-opacity duration-400"
          ref={interfaceRef}
        >
          <p className="h-6" />
          <div className="border-muted backdrop-blur-md bg-muted/60 text-center">
            <div className="max-w-7xl mx-auto p-2.5">
              <h1 className="text-xl">{data.title}</h1>
              <p className="mt-1">{data.description}</p>
            </div>
            <Separator className="opacity-70" />
            <BreadCrumbs
              crumbLinks={bcLinks}
              menuLinks={menuLinks.map((ml) => ({ link: ml, text: t[ml] }))}
              paigeLink={data.title}
            />
            {/* <Breadcrumb>
              <BreadcrumbList className="text-base justify-center">
                <BreadcrumbItem>
                  <Link
                    className="transition-colors hover:text-foreground"
                    href={`/${locale}`}
                  >
                    <Home className="p-0.5" />
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem className="text-base p-0">
                        <Link
                          className="transition-colors hover:text-foreground inline-block w-full h-full px-2 py-1.5"
                          href="../../gallery"
                        >
                          Gallery
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-base p-0">
                        <Link
                          className="transition-colors hover:text-foreground inline-block w-full h-full px-2 py-1.5"
                          href="../../events"
                        >
                          Events
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-base p-0">
                        <Link
                          className="transition-colors hover:text-foreground inline-block w-full h-full px-2 py-1.5"
                          href="../../about"
                        >
                          About
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Link
                    className="transition-colors hover:text-foreground"
                    href="../"
                  >
                    Post
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Image</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
            <Separator className="opacity-70" />
            <div className="max-w-7xl relative mx-auto">
              <div className="flex gap-5 flex-wrap p-4 justify-start sm:justify-center">
                <TooltipButton
                  text={t.previousSlideTooltip}
                  className="z-10 bg-background/60 hover:bg-border/60"
                  offset={8}
                  tooltipStyle={tooltipStyle}
                >
                  <TransitionLink
                    href={prev}
                    scroll={false}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <ChevronLeft />
                  </TransitionLink>
                </TooltipButton>
                {zoomable && (
                  <FullscreenButton
                    className="z-10 bg-background/60 hover:bg-border/60"
                    handleClose={handleMinimize}
                    handleOpen={handleMaximize}
                    openIcon={<Maximize />}
                    closeIcon={<Minimize />}
                  />
                )}
                <TooltipButton
                  text={t.nextSlideTooltip}
                  className="z-10 bg-background/60 hover:bg-border/60"
                  offset={8}
                  tooltipStyle={tooltipStyle}
                >
                  <TransitionLink
                    href={next}
                    scroll={false}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <ChevronRight />
                  </TransitionLink>
                </TooltipButton>
                {/* <TooltipButton
                  text={t.closeTooltip}
                  className={clsx("z-10 bg-background/60 hover:bg-border/60")}
                  offset={8}
                  tooltipStyle={tooltipStyle}
                >
                  <Link
                    href={backLink}
                    className="w-full h-full flex items-center justify-center"
                    prefetch
                  >
                    <X />
                  </Link>
                </TooltipButton> */}
              </div>
              <ShareMenuQuarter
                className="absolute bottom-4 right-4"
                text={data.description}
                title={data.description}
              />
            </div>
          </div>
        </div>
        <div
          ref={zoomContainerRef}
          style={{
            position: "fixed",
            zIndex: 50,
            overflow: "hidden",
          }}
          onMouseMove={throttle(handleMouseMove, 5)}
          onTouchStart={handleTouchStart}
          onTouchMove={throttle(handleTouchMove, 1)}
          className="invisible opacity-0 transition-opacity duration-400 fixed z-50 cursor-move"
          onClick={hideZoomedImg}
        >
          <Image
            src={data.image.url}
            alt={data.title}
            style={{
              position: "absolute",
              minHeight: "100%",
              minWidth: "100%",
              transform: "translate(0px, 0px)",
            }}
            width={data.image.width}
            height={data.image.height}
            className="transform-gpu bg-background"
            ref={zoomImageRef}
            priority
            placeholder={data.image.lqip ? "blur" : "empty"}
            blurDataURL={data.image.lqip ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
