"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/utils/i18context";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { MessageSquareMore, SendHorizontal } from "lucide-react";
import { ChangeEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export default function MessageForm() {
  const t = useI18n();
  const [open, setOpen] = useState(false);
  const [v, setV] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setV(e.target.value);
  };
  const handleOpen = () => {
    setOpen(!open);
    console.log("au");
  };
  const handleBlur = () => {
    setOpen(false);
  };

  const sendMessage = async () => {
    let telegramSuccess = false;
    let emailSuccess = false;
    try {
      const telegramResponse = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: v }),
      });
      const emailResponse = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: v }),
      });
      telegramSuccess = telegramResponse.ok;
      emailSuccess = emailResponse.ok;
    } catch (e) {
      console.warn("Send telegram message failed", (e as Error).message);
    } finally {
      if (telegramSuccess && emailSuccess) {
        toast(t.sendMessageSuccess, {
          description: new Date().toLocaleString(),
        });
        setV("");
        setOpen(false);
      } else {
        toast(t.sendMessageFailed, {
          description: new Date().toLocaleString(),
        });
        console.warn("Failed to send email");
      }
      // emailjs
      //   .send(
      //     process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
      //     process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
      //     { message: v },
      //     { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "" },
      //   )
      //   .then(
      //     () => {
      //       if (telegramResponse.ok) {
      //         toast(t.sendMessageSuccess, {
      //           description: new Date().toLocaleString(),
      //         });
      //         setV("");
      //         setOpen(false);
      //       }
      //     },
      //     (e) => {
      //       toast(t.sendMessageFailed, {
      //         description: new Date().toLocaleString(),
      //       });
      //       console.warn("Send email failed", e.text);
      //     },
      //   );
    }
  };

  return (
    <Popover onOpenChange={handleOpen} open={open}>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="p-0" disabled={!v && open}>
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
              className={`bg-background/50 backdrop-blur-sm px-2 py-1 text-base rounded-sm mb-1 ${open ? "z-20" : "z-0"}`}
            >
              <p>{open ? t.sendMessageTooltip : t.writeTooltip}</p>
            </TooltipContent>
          </Tooltip>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onCloseAutoFocus={handleBlur}
        className="w-72 p-2 bg-background/50 backdrop-blur-sm rounded-xl mb-3"
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
