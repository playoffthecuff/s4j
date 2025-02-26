"use client";

import { subscribeUser, unsubscribeUser } from "@/lib/actions";
import { useI18n } from "@/lib/utils/i18context";
import { Bell, BellOff } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TriggerButton } from "../buttons";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  const t = useI18n();

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    const subStr = JSON.stringify(sub);
    setSubscription(sub);
    await subscribeUser(subStr);
    const description = new Date().toLocaleString();
    if (!!subStr)
      toast.success(t.successSubscribedToPushTooltip, { description });
  }

  async function unsubscribeFromPush() {
    if (!subscription) return;
    await unsubscribeUser(JSON.stringify(subscription));
    await subscription?.unsubscribe();
    setSubscription(null);
    const description = new Date().toLocaleString();
    toast.success(t.successUnsubscribedFromPushTooltip, { description });
  }

  return (
    isSupported && (
      <TriggerButton
        handleOff={unsubscribeFromPush}
        handleOn={subscribeToPush}
        isOn={!!subscription}
        offIcon={<BellOff />}
        onIcon={<Bell />}
        offText={t.subscribeToPushTooltip}
        onText={t.unsubscribeFromPushTooltip}
      ></TriggerButton>
    )
  );
}
