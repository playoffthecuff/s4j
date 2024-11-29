"use client";

import { Share2, X } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { useI18n } from "@/utils/i18context";

export default function Tez({
  className,
}: {
  className?: string;
}) {
  const t = useI18n();
  return (
    <div className={className}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="h-12 w-12 rounded-full"
          >
            <Share2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className={`bg-background/50 backdrop-blur-sm px-2 py-1 rounded-sm`}
        >
          <p>{t.shareTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
