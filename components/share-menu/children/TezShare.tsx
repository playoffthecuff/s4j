"use client";

import { useI18n } from "@/lib/utils/i18context";
import { Share2 } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

export function TezShare({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const t = useI18n();
  const handleClick = () => {
    if (onClick) onClick();
  };
  return (
    <div className={className} onClick={handleClick}>
      <Tooltip>
        <TooltipTrigger asChild aria-label={t.shareTooltip}>
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 rounded-full"
          >
            <Share2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className={`bg-background/60 backdrop-blur-md px-2 py-1 rounded-xs`}
        >
          <p>{t.shareTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
