"use client";

import { useI18n } from "@/lib/utils/i18context";
import { Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

export function TwitterShare({
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
            className="h-10 w-10 rounded-full bg-background/80 hover:bg-border/60 backdrop-blur-md"
          >
            <a
              target="_blank"
              href={encodeURI(
                `https://twitter.com/intent/tweet?url=${link}&text=${text}`
              )}
              aria-label="share on twitter"
            >
              <Twitter className="w-9 h-9" />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t.twitterShareTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
