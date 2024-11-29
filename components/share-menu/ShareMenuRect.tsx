"use client";

import { useState } from "react";
import ShareButton from "./children/ShareButton";
import FacebookShare from "./children/FacebookShare";
import LinkedInShare from "./children/LinkedInShare";
import RedditShare from "./children/RedditShare";
import TelegramShare from "./children/TelegramShare";
import TwitterShare from "./children/TwitterShare";
import VkShare from "./children/VkShare";
import WhatsappShare from "./children/WhatsappShare";
import CopyButton from "./children/CopyButton";

export default function ShareMenuRect({
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
  return (<div className={className}>
      <ShareButton
        handleClick={handleClick}
        open={open}
        className={`h-12 w-12 relative z-40`}
      />
      <FacebookShare
        className={`h-12 w-12 absolute transform-gpu duration-300 ${open ? "z-30 -translate-y-[104px] opacity-100" : "-translate-y-full opacity-0"}`}
      />
      <LinkedInShare
        text={text}
        title={title}
        className={`h-12 w-12 absolute transform-gpu duration-500 ${open ? "z-20 -translate-y-full -translate-x-28 opacity-100" : "-translate-y-full opacity-0"}`}
      />
      <RedditShare
        text={text}
        className={`h-12 w-12 absolute transform-gpu duration-600 ${open ? "z-20 -translate-y-[104px] -translate-x-[168px] opacity-100" : "-translate-y-full opacity-0"}`}
      />
      <TelegramShare
        text={text}
        className={`h-12 w-12 absolute transform-gpu duration-400 ${open ? "z-30 -translate-y-[104px] -translate-x-[56px] opacity-100" : "-translate-y-full opacity-0"}`}
      />
      <CopyButton
        className={`h-12 w-12 absolute transform-gpu duration-500 ${open ? "z-40 -translate-y-full -translate-x-[168px] opacity-100" : "-translate-y-full opacity-0"}`}
      />
      <VkShare
        text={text}
        title={title}
        className={`h-12 w-12 absolute transform-gpu duration-500 ${open ? "z-20 -translate-y-[104px] -translate-x-28 opacity-100" : "-translate-y-full opacity-0"}`}
      />
      <TwitterShare
        text={text}
        className={`h-12 w-12 absolute transform-gpu duration-300 ${open ? "z-30 -translate-y-full -translate-x-[56px] opacity-100" : "-translate-y-full opacity-0"}`}
      />
    </div>
  );
}
