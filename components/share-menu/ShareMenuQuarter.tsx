"use client";

import { useRef, useState } from "react";
import {
  ShareButton,
  FacebookShare,
  LinkedInShare,
  RedditShare,
  TelegramShare,
  CopyButton,
  WhatsappShare,
  VkShare,
  TwitterShare,
} from "./children";
import clsx from "clsx";
import { useClickOutside } from "@/lib/hooks/use-click-outside";

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
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setOpen(false));

  return (
    <div className={className} ref={containerRef}>
      <ShareButton
        handleClick={handleClick}
        open={open}
        className={`h-10 w-10 relative z-50 backdrop-blur-md bg-background/60 hover:bg-border/60`}
      />
      <FacebookShare
        className={clsx(
          "h-10 w-10 absolute transform-gpu duration-400",
          open
            ? "z-30 -translate-y-[98.4px] opacity-100"
            : "-translate-y-full opacity-0",
        )}
      />
      <LinkedInShare
        text={text}
        title={title}
        className={clsx(
          "h-10 w-10 absolute transform-gpu duration-600",
          open
            ? "z-20 -translate-y-[156.8px] opacity-100"
            : "-translate-y-full opacity-0",
        )}
      />
      <RedditShare
        text={text}
        className={clsx(
          "h-10 w-10 absolute transform-gpu duration-600",
          open
            ? "z-20 -translate-y-[148px] -translate-x-[44px] opacity-100"
            : "-translate-y-full opacity-0",
        )}
      />
      <TelegramShare
        text={text}
        className={clsx(
          "h-10 w-10 absolute transform-gpu duration-600",
          open
            ? "z-20 -translate-y-[120px] -translate-x-[80px] opacity-100"
            : "-translate-y-full opacity-0",
        )}
      />
      <CopyButton
        className={clsx(
          "h-10 w-10 absolute transition-all transform-gpu duration-600",
          open
            ? "z-40 -translate-y-full -translate-x-[116.8px] opacity-100"
            : "-translate-y-full opacity-0",
        )}
      />
      <WhatsappShare
        text={text}
        className={clsx(
          "h-10 w-10 absolute transform-gpu duration-400",
          open
            ? "z-30 -translate-y-[80px] -translate-x-[40px] opacity-100"
            : "-translate-y-full opacity-0",
        )}
      />
      <VkShare
        text={text}
        title={title}
        className={clsx(
          "h-10 w-10 absolute transform-gpu duration-600",
          open
            ? "z-20 -translate-y-[82px] -translate-x-[104px] opacity-100"
            : "-translate-y-full opacity-0",
        )}
      />
      <TwitterShare
        text={text}
        className={clsx(
          "h-10 w-10 absolute transform-gpu duration-400",
          open
            ? "z-30 -translate-y-full -translate-x-[58.4px] opacity-100"
            : "-translate-y-full opacity-0",
        )}
      />
    </div>
  );
}
