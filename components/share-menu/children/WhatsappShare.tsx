"use client";

import { WhatsappIcon } from "@/components/icons";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { useI18n } from "@/lib/utils/i18context";
import { useEffect, useState } from "react";

export function WhatsappShare({
  className,
  text,
}: {
  className?: string;
  text: string;
}) {
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
                `https://api.whatsapp.com/send?text=${text} ${link}`,
              )}
              aria-label="share on whatsapp"
            >
              <WhatsappIcon width={28} height={28} />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className={`bg-background/50 backdrop-blur-sm px-2 py-1 rounded-sm z-30`}
        >
          <p>{t.whatsappShareTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
