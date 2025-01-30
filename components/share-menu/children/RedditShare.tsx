"use client";

import { RedditIcon } from "@/components/icons";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { useI18n } from "@/lib/utils/i18context";
import { useEffect, useState } from "react";

export function RedditShare({
  className,
  text,
}: {
  className?: string;
  text: string;
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
                `https://www.reddit.com/submit?url=${link}&title=${text}`,
              )}
              aria-label="share on reddit"
            >
              <RedditIcon width={20} height={20} />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className={`bg-background/60 backdrop-blur-md px-2 py-1 rounded-sm z-20 text-base`}
        >
          <p>{t.redditShareTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
