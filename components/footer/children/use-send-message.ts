import { sendEmailMessage, sendTelegramMessage } from "@/lib/actions";
import { useI18n } from "@/lib/utils/i18context";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

export default function useSendMessage() {
  const [v, setV] = useState("");
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setV(e.target.value);
  };
  const [open, setOpen] = useState(false);
  const t = useI18n();
  const sendMessage = async () => {
    const isTelegramSuccess = await sendTelegramMessage(v);
    const isEmailSuccess = await sendEmailMessage(v);
    const description = new Date().toLocaleString();
    if (isTelegramSuccess || isEmailSuccess) {
      toast.success(t.sendMessageSuccess, { description });
      setV("");
      setOpen(false);
    } else {
      toast.error(t.sendMessageFailed, { description });
    }
  };
  return { v, open, setOpen, handleChange, sendMessage, t };
}
