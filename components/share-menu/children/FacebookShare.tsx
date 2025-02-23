"use client";

import { useI18n } from "@/lib/utils/i18context";
import { Facebook } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

export function FacebookShare({ className }: { className?: string }) {
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
            className="h-10 w-10 rounded-full bg-background/60 hover:bg-border/60 backdrop-blur-md"
          >
            <a
              target="_blank"
              href={encodeURI(
                `https://www.facebook.com/sharer/sharer.php?u=${link}`
              )}
              aria-label="share on facebook"
            >
              <Facebook />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent align="end">
          <p>{t.facebookShareTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
