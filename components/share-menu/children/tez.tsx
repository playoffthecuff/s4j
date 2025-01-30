"use client";

import { Share2 } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { useI18n } from "@/lib/utils/i18context";

export function Tez({ className }: { className?: string }) {
  const t = useI18n();
  return (
    <div className={className}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 rounded-full"
          >
            <Share2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className={`bg-background/60 backdrop-blur-md px-2 py-1 rounded-sm`}
        >
          <p>{t.shareTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
