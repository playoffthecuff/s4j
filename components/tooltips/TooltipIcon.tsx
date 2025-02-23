import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import { CSSProperties, ReactNode } from "react";

export function TooltipIcon({
  text,
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
  text: string;
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
        <p>{text}</p>
      </TooltipContent>
      <TooltipTrigger asChild className={className} style={style}>
        {children}
      </TooltipTrigger>
    </Tooltip>
  );
}