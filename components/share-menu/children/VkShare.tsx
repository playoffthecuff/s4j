"use client";

import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { useI18n } from "@/utils/i18context";
import { useEffect, useState } from "react";
import VkIcon from "../../icons/vk";

export default function VkShare({
  className,
  text,
  title,
}: {
  className?: string;
  text: string;
  title: string;
}) {
  const t = useI18n();
  const [link, setLink] = useState("");
  useEffect(() => {
    if (typeof window !== undefined) setLink(window.location.href);
  }, []);

  return (
    <div className={className}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            <a
              target="_blank"
              href={encodeURI(
                `https://vk.com/share.php?url=${link}&title=${title}&description=${text}%&noparse=true`,
              )}
              aria-label="share on vk"
            >
              <VkIcon width={28} height={28} />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className={`bg-background/50 backdrop-blur-sm px-2 py-1 rounded-sm z-20`}
        >
          <p>{t.vkShareTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
