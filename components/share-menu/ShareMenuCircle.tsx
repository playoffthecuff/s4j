"use client";

import { useState } from "react";
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

export function ShareMenuCircle({
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
  return (
    <div className={className}>
      <ShareButton
        handleClick={handleClick}
        open={open}
        className={`h-12 w-12 relative z-10`}
      />
      <FacebookShare
        className={clsx(
          "h-12 w-12 absolute transform-gpu duration-400",
          open
            ? "z-20 -translate-y-32 opacity-100"
            : "-translate-y-full opacity-0",
        )}
      />
      <LinkedInShare
        text={text}
        title={title}
        className={clsx(
          "h-12 w-12 absolute transform-gpu duration-400",
          open
            ? "z-20 -translate-y-[104.8px] translate-x-[56.8px] opacity-100"
            : "-translate-y-full opacity-0",
        )}
      />
      <RedditShare
        text={text}
        className={clsx(
          "h-12 w-12 absolute transform-gpu duration-400",
          open
            ? "z-20 -translate-y-full translate-x-20 opacity-100"
            : "-translate-y-full opacity-0",
        )}
      />
      <TelegramShare
        text={text}
        className={clsx(
          "h-12 w-12 absolute transform-gpu duration-400",
          open
            ? "z-20 translate-y-[12.8px] translate-x-[56.8px] opacity-100"
            : "-translate-y-full opacity-0",
        )}
      />
      <CopyButton
        className={clsx(
          "h-12 w-12 absolute transform-gpu duration-400",
          open
            ? "z-40 translate-y-8 opacity-100"
            : "-translate-y-full opacity-0",
        )}
      />
      <WhatsappShare
        text={text}
        className={clsx(
          "h-12 w-12 absolute transform-gpu duration-400",
          open
            ? "z-20 -translate-y-[104.8px] -translate-x-[56.8px] opacity-100"
            : "-translate-y-full opacity-0",
        )}
      />
      <VkShare
        text={text}
        title={title}
        className={clsx(
          "h-12 w-12 absolute transform-gpu duration-400",
          open
            ? "z-30 translate-y-[12.8px] -translate-x-[56.8px] opacity-100"
            : "-translate-y-full opacity-0",
        )}
      />
      <TwitterShare
        text={text}
        className={clsx(
          "h-12 w-12 absolute transform-gpu duration-400",
          open
            ? "z-20 -translate-y-full -translate-x-20 opacity-100"
            : "-translate-y-full opacity-0",
        )}
      />
    </div>
  );
}
