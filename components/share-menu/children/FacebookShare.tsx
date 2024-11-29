"use client";

import { Facebook } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { useI18n } from "@/utils/i18context";
import { useEffect, useState } from "react";

export default function FacebookShare({ className }: { className?: string }) {
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
            className="h-12 w-12 rounded-full"
          >
            <a
              target="_blank"
              href={encodeURI(
                `https://www.facebook.com/sharer/sharer.php?u=${link}`,
              )}
              aria-label="share on facebook"
            >
              <Facebook className="w-10 h-10 p-2" />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          align="end"
          className={`bg-background/50 backdrop-blur-sm px-2 py-1 rounded-sm`}
        >
          <p>{t.facebookShareTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
