import { useState, ChangeEvent } from "react";
import { toast } from "sonner";
import { sendTelegramMessage, sendEmailMessage } from "../actions";
import { useI18n } from "../utils/i18context";

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
      toast(t.sendMessageSuccess, { description });
      setV("");
      setOpen(false);
    } else {
      toast(t.sendMessageFailed, { description });
    }
  };
  return {v, open, setOpen, handleChange, sendMessage, t}
}