import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui";
import clsx from "clsx";

export function TooltipButton({
  text,
  children,
  disabled = false,
  className,
  style,
  tooltipStyle,
  offset,
  side,
  onClick,
  open,
  onOpenChange,
  zClass = "z-20",
}: {
  text: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  tooltipStyle?: CSSProperties;
  offset?: number;
  side?: "left" | "right" | "top" | "bottom";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  zClass?: string;
}) {
  return (
    <Tooltip
      disableHoverableContent={disabled}
      open={open}
      onOpenChange={onOpenChange}
      delayDuration={100}
    >
      <TooltipContent
        sideOffset={offset}
        side={side}
        className={
          (clsx(
            "bg-background/60 backdrop-blur-md text-base px-2 py-1 rounded-sm",
          ),
          zClass)
        }
        style={tooltipStyle}
      >
        <p>{text}</p>
      </TooltipContent>
      <TooltipTrigger asChild className={className} style={style}>
        <Button
          variant="outline"
          size="icon"
          tabIndex={-1}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </Button>
      </TooltipTrigger>
    </Tooltip>
  );
}
