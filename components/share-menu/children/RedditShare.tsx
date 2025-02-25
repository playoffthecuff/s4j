"use client";

import { RedditIcon } from "@/components/icons";
import { useI18n } from "@/lib/utils/i18context";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

export function RedditShare({
  className,
  text,
  onClick,
}: {
  className?: string;
  text: string;
  onClick?: () => void;
}) {
  const t = useI18n();
  const [link, setLink] = useState("");
  useEffect(() => {
    if (typeof window !== undefined) setLink(window.location.href);
  }, []);
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div className={className} onClick={handleClick}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-background/60 hover:bg-border/80 backdrop-blur-md"
          >
            <a
              target="_blank"
              href={encodeURI(
                `https://www.reddit.com/submit?url=${link}&title=${text}`
              )}
              aria-label="share on reddit"
            >
              <RedditIcon width={20} height={20} />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t.redditShareTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
