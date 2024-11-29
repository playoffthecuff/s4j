"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { useI18n } from "@/utils/i18context";
import { useState } from "react";

export default function CopyButton({ className }: { className?: string }) {
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
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                <Check className="w-10 h-10 p-2" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              className={`bg-background/50 backdrop-blur-sm px-2 py-1 rounded-sm`}
            >
              <p>{t.copiedTooltip}</p>
            </TooltipContent>
          </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
              <Copy className="w-10 h-10 p-2" onClick={handleCopy} />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className={`bg-background/50 backdrop-blur-sm px-2 py-1 rounded-sm z-20`}
          >
            <p>{t.copyToClipboard}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
