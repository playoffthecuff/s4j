"use client";

import { useI18n } from "@/lib/utils/i18context";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

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
              <Check />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
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
              onClick={handleCopy}
            >
              <Copy />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t.copyToClipboardTooltip}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
