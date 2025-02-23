"use client";

import { VkIcon } from "@/components/icons";
import { useI18n } from "@/lib/utils/i18context";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

export function VkShare({
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
            className="h-10 w-10 rounded-full bg-background/60 hover:bg-border/60 backdrop-blur-md"
          >
            <a
              target="_blank"
              href={encodeURI(
                `https://vk.com/share.php?url=${link}&title=${title}&description=${text}%&noparse=true`
              )}
              aria-label="share on vk"
            >
              <VkIcon width={24} height={24} />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t.vkShareTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
