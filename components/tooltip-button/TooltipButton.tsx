"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useI18n } from "@/utils/i18context";

export default function TooltipButton({
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
        <TooltipContent
          className={`relative bg-background/50 backdrop-blur-sm px-2 rounded-sm z-20 bottom-2 left-0"}`}
        >
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
