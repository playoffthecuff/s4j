"use client";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";

import clsx from "clsx";
import { ReactNode, useState } from "react";

export function PopoverToggleTooltipButton({
  initIcon,
  activeIcon,
  initText,
  activeText,
  content,
  className,
  popoverSide,
  tooltipSide,
  hide = false,
}: {
  initIcon: ReactNode;
  activeIcon: ReactNode;
  initText: string;
  activeText: string;
  content: ReactNode;
  className?: string;
  popoverSide?: "top" | "right" | "bottom" | "left";
  tooltipSide?: "top" | "right" | "bottom" | "left";
  hide?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const handleBlur = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Popover open={open && !hide} onOpenChange={handleOpen} defaultOpen>
      <PopoverTrigger asChild className={className}>
        <Button
          variant="outline"
          className="px-2 bg-background/60 hover:bg-border/60 backdrop-blur-md w-10"
        >
          <Tooltip >
            <TooltipTrigger asChild>
              <div
                className={clsx("grid content-center", hide && "hidden")}
                style={{ gridTemplateAreas: "icon" }}
              >
                <span
                  style={{ gridArea: "icon" }}
                  className={clsx(
                    "transition-all duration-250",
                    open ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  )}
                >
                  {activeIcon}
                </span>
                <span
                  style={{ gridArea: "icon" }}
                  className={clsx(
                    "transition-all duration-250",
                    open ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  )}
                >
                  {initIcon}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side={tooltipSide}
              sideOffset={16}
              align="center"
              className={clsx(
                open && "opacity-0"
              )}
            >
              <p>{open ? activeText : initText}</p>
            </TooltipContent>
          </Tooltip>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side={popoverSide}
        onCloseAutoFocus={handleBlur}
        className="z-30 bg-transparent p-0 w-fit rounded-md overflow-hidden ml-4 tracking-wide font-medium"
      >
        {content}
      </PopoverContent>
    </Popover>
  );
}
