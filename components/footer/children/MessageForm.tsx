"use client";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Textarea,
} from "@/components/ui";

import useSendMessage from "@/lib/hooks/use-send-message";
import clsx from "clsx";
import { MessageSquareMore, SendHorizontal } from "lucide-react";

export function MessageForm() {
  const { open, setOpen, v, handleChange, sendMessage, t } = useSendMessage();
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleBlur = () => {
    setOpen(false);
  };

  return (
    <Popover onOpenChange={handleOpen} open={open}>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="p-0" disabled={!v && open} aria-label="send message">
          <Tooltip>
            <TooltipTrigger asChild>
              {open ? (
                <SendHorizontal
                  className="w-10 h-10 p-2"
                  onClick={sendMessage}
                />
              ) : (
                <MessageSquareMore className="w-10 h-10 p-2" />
              )}
            </TooltipTrigger>
            <TooltipContent
              className={clsx(
                "bg-background/60 backdrop-blur-md px-2 py-1 text-base rounded-sm mb-1",
                open && "z-50",
              )}
              side={open ? "right" : "top"}
            >
              <p>{open ? t.sendMessageTooltip : t.writeTooltip}</p>
            </TooltipContent>
          </Tooltip>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onCloseAutoFocus={handleBlur}
        className="w-72 p-2 bg-background/60 backdrop-blur-md rounded-xl mb-3 z-40"
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
