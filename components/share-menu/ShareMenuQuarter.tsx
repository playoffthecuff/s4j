"use client";

import { useClickOutside } from "@/lib/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { useRef, useState } from "react";
import {
  CopyButton,
  FacebookShare,
  LinkedInShare,
  RedditShare,
  ShareButton,
  TelegramShare,
  TwitterShare,
  VkShare,
  WhatsappShare,
} from "./children";

export function ShareMenuQuarter({
  className,
  text,
  title,
}: {
  className?: string;
  text: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  const close = () => {
    if (open) setTimeout(() => setOpen(false), 2000);
  };
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setOpen(false));

  return (
    <div className={cn("h-10 w-10 relative", className)} ref={containerRef} onClick={close}>
      <ShareButton
        handleClick={handleClick}
        open={open}
        className={`h-10 w-10 absolute left-0 top-0 z-50 backdrop-blur-md bg-background/60 hover:bg-border/60`}
      />
      <FacebookShare
        className={clsx(
          "h-10 w-10 absolute transform-gpu duration-400",
          open ? "z-30 -translate-y-[58.4px] opacity-100" : "opacity-0"
        )}
      />
      <LinkedInShare
        text={text}
        title={title}
        className={clsx(
          "h-10 w-10 absolute transform-gpu duration-600",
          open ? "z-20 -translate-y-[116.8px] opacity-100" : "opacity-0"
        )}
      />
      <RedditShare
        text={text}
        className={clsx(
          "h-10 w-10 absolute transform-gpu duration-600",
          open
            ? "z-20 -translate-y-27 -translate-x-11 opacity-100"
            : "opacity-0"
        )}
      />
      <TelegramShare
        text={text}
        className={clsx(
          "h-10 w-10 absolute transform-gpu duration-600",
          open
            ? "z-20 -translate-y-20 -translate-x-20 opacity-100"
            : "opacity-0"
        )}
      />
      <CopyButton
        className={clsx(
          "h-10 w-10 absolute transition-all transform-gpu duration-600",
          open ? "z-40 -translate-x-[116.8px] opacity-100" : "opacity-0"
        )}
      />
      <WhatsappShare
        text={text}
        className={clsx(
          "h-10 w-10 absolute transform-gpu duration-400",
          open
            ? "z-30 -translate-y-10 -translate-x-10 opacity-100"
            : "opacity-0"
        )}
      />
      <VkShare
        text={text}
        title={title}
        className={clsx(
          "h-10 w-10 absolute transform-gpu duration-600",
          open
            ? "z-20 -translate-y-10.5 -translate-x-26 opacity-100"
            : "opacity-0"
        )}
      />
      <TwitterShare
        text={text}
        className={clsx(
          "h-10 w-10 absolute transform-gpu duration-400",
          open ? "z-30 -translate-x-[58.4px] opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
