"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { useI18n } from "@/lib/utils/i18context";
import { useState } from "react";

export function CopyButton({ className }: { className?: string }) {
  const t = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  return (
    <div className={className}>
      {copied ? (
        <Tooltip open>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/60 hover:bg-border/60 backdrop-blur-md"
            >
              <Check className="w-8 h-8 p-2" />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className={`bg-background/60 backdrop-blur-md px-2 py-1 rounded-sm`}
          >
            <p>{t.copiedTooltip}</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/60 hover:bg-border/60"
            >
              <Copy className="w-9 h-9 p-2" onClick={handleCopy} />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className={`bg-background/60 backdrop-blur-md px-2 py-1 rounded-sm z-20 text-base`}
          >
            <p>{t.copyToClipboardTooltip}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
