"use client";

import { Share2, X } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { useI18n } from "@/utils/i18context";

export default function ShareButton({
  className,
  open,
  handleClick,
}: {
  className?: string;
  open: boolean;
  handleClick: () => void;
}) {
  const t = useI18n();
  return (
    <div className={className}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            onClick={handleClick}
            className="h-12 w-12 rounded-full"
          >
            {open ? <X /> : <Share2 />}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          align="end"
          className={`bg-background/50 backdrop-blur-sm px-2 py-1 rounded-sm`}
        >
          <p>{open ? t.closeTooltip : t.shareTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
