"use client";

import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { useI18n } from "@/lib/utils/i18context";
import { useEffect, useState } from "react";
import { Linkedin } from "lucide-react";

export function LinkedInShare({
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
            className="h-10 w-10 rounded-full bg-background/60 hover:bg-border/60 backdrop-blur-md"
          >
            <a
              target="_blank"
              href={encodeURI(
                `https://www.linkedin.com/shareArticle?mini=true&url=${link}&title=${title}&summary=${text}&source=Julia Ribetki official website`,
              )}
              aria-label="share on linkedin"
            >
              <Linkedin className="w-9 h-9 p-2" />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          align="end"
          className={`bg-background/60 backdrop-blur-md px-2 py-1 rounded-sm text-base`}
        >
          <p>{t.linkedInShareTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
