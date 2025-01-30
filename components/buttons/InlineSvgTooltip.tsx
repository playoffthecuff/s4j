"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import React from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/utils/i18context";
import { Button } from "../ui";

export function InlineSvgTooltipButton({
  svg,
  label,
  translation,
}: {
  svg?: string;
  label?: { ru: string; en: string };
  translation?: string;
}) {
  const pathname = usePathname();
  const l = pathname.split("/")[2];
  const t = useI18n();

  return (
    <Tooltip>
      <TooltipContent className="relative bg-background/60 backdrop-blur-md px-2 py-1 rounded-sm z-20 bottom-2 left-0 border">
        {label && <p>{l === "ru" ? label?.ru : label?.en}</p>}
        {translation && <p>{t[translation]}</p>}
      </TooltipContent>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" tabIndex={-1}>
          {svg && <div dangerouslySetInnerHTML={{ __html: svg }}></div>}
        </Button>
      </TooltipTrigger>
    </Tooltip>
  );
}
