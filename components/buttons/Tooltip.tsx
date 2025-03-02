import clsx from "clsx";
import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui";
import { Button } from "../ui/button";

export function TooltipButton({
  text,
  children,
  disabled = false,
  className,
  style,
  offset,
  side,
  onClick,
  open,
  onOpenChange,
  zClass = "z-20",
  ariaLabel,
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
  ariaLabel?: string;
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
        className={(clsx(""), zClass)}
      >
        <p>{text}</p>
      </TooltipContent>
      <TooltipTrigger
        asChild
        className={className}
        style={style}
        aria-label={ariaLabel}
      >
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
