"use client";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";

import clsx from "clsx";
import { MessageSquareMore, SendHorizontal } from "lucide-react";
import useSendMessage from "./use-send-message";

export function MessageForm() {
  const { open, setOpen, v, handleChange, sendMessage, t } = useSendMessage();
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleBlur = () => {
    setOpen(false);
  };
  const handleClick = () => {
    if (v && open) sendMessage();
  };

  return (
    <Popover open={open} onOpenChange={handleOpen} defaultOpen>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="p-0 w-10"
          aria-label={open ? t.sendMessageTooltip : t.writeTooltip}
          disabled={open && !v}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={clsx("grid content-center")}
                style={{ gridTemplateAreas: "icon" }}
                onClick={handleClick}
              >
                <span
                  style={{ gridArea: "icon" }}
                  className={clsx(
                    "transition-all duration-250",
                    open ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  )}
                >
                  <SendHorizontal />
                </span>
                <span
                  style={{ gridArea: "icon" }}
                  className={clsx(
                    "transition-all duration-250",
                    open ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  )}
                >
                  <MessageSquareMore />
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side={open ? "right" : "top"}
              sideOffset={20}
              className={clsx(
                "bg-background/60 backdrop-blur-md px-2 py-1 text-base font-normal"
              )}
            >
              <p>{open ? t.sendMessageTooltip : t.writeTooltip}</p>
            </TooltipContent>
          </Tooltip>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        onCloseAutoFocus={handleBlur}
        className="w-72 p-2 bg-background/60 backdrop-blur-md rounded-[14px] mb-3 z-10 tracking-wide"
      >
        <Textarea
          placeholder={t.writeMePlaceholder}
          onChange={handleChange}
          value={v}
        />
      </PopoverContent>
    </Popover>
  );
}
