"use client";

import { EmailIcon } from "@/components/icons";
import { useI18n } from "@/lib/utils/i18context";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

export function EmailShare({
  className,
  text,
  title,
}: {
  className?: string;
  text: string;
  title: string;
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
            className="h-10 w-10 rounded-full"
          >
            <a
              target="_blank"
              href={encodeURI(
                `mailto:?subject=${title}&body=${text}%0A${link}`
              )}
              aria-label="share by email"
            >
              <EmailIcon width={24} height={24} />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className={`bg-background/60 backdrop-blur-md px-2 py-1 rounded-xs z-20`}
        >
          <p>{t.emailShareTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
