"use client";

import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { useI18n } from "@/utils/i18context";
import { useEffect, useState } from "react";
import EmailIcon from "../../icons/email";

export default function EmailShare({
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
            className="h-12 w-12 rounded-full"
          >
            <a
              target="_blank"
              href={encodeURI(
                `mailto:?subject=${title}&body=${text}%0A${link}`,
              )}
              aria-label="share by email"
            >
              <EmailIcon width={28} height={28} />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className={`bg-background/50 backdrop-blur-sm px-2 py-1 rounded-sm z-20`}
        >
          <p>{t.emailShareTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
