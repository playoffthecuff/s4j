"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import { useI18n } from "@/lib/utils/i18context";
import { CSSProperties, ReactNode } from "react";

export function TooltipTranslationIcon({
  translation,
  children,
  delay,
  disabled = false,
  className,
  style,
  offset,
  side,
  open,
  onOpenChange,
}: {
  translation: string;
  children: ReactNode;
  delay?: number;
  disabled?: boolean;
  className?: string;
  rootClass?: string;
  style?: CSSProperties;
  offset?: number;
  side?: "left" | "right" | "top" | "bottom";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const t = useI18n();
  return (
    <Tooltip
      disableHoverableContent={disabled}
      open={open}
      onOpenChange={onOpenChange}
      delayDuration={delay}
    >
      <TooltipContent
        sideOffset={offset}
        side={side}
        className="bg-background/60 backdrop-blur-md text-base z-20"
      >
        <p>{t[translation]}</p>
      </TooltipContent>
      <TooltipTrigger asChild className={className} style={style}>
        {children}
      </TooltipTrigger>
    </Tooltip>
  );
}