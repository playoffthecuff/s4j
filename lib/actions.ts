"use server";

import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import webpush, { PushSubscription as WebPushSub } from "web-push";
import redis from "./redis";

export async function sendTelegramMessage(text: string) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN ?? "";
    const chat_id = process.env.TELEGRAM_CHAT_ID
      ? +process.env.TELEGRAM_CHAT_ID
      : 0;
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id,
        text,
      }),
    });
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error("Fail sending telegram message", (e as Error).message);
    return false;
  }
}

export async function sendEmailMessage(text: string) {
  try {
    const transporter = createTransport({
      host: "mail.mail.ee",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions: Mail.Options = {
      from: "j.ribetki@mail.ee",
      to: "jribetki@gmail.com",
      subject:
        "Сообщение из формы обратной связи личного сайта (ribetki.vercel.app)",
      text,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (e) {
    console.error("Fail sending email", (e as Error).message);
    return false;
  }
}

webpush.setVapidDetails(
  "mailto:jribetki@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function subscribeUser(subStr: string) {
  const { endpoint }: WebPushSub = JSON.parse(subStr);
  try {
    const result = await redis.set(`push:${endpoint}`, subStr);
    return result;
  } catch (error) {
    console.log(error);
  }
  return { success: true };
}

export async function unsubscribeUser(sub: string) {
  const subscription: WebPushSub = JSON.parse(sub);
  const { endpoint } = subscription;
  try {
    const result = await redis.del(`push:${endpoint}`);
    return result > 0;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function sendNotification(title: string, body: string) {
  try {
    const keys = await redis.keys("push:*");
    if (!keys.length) return;
    for (const key of keys) {
      const subscriptionString = await redis.get(key);
      if (!subscriptionString) continue;
      const subscription: WebPushSub = JSON.parse(subscriptionString);
      try {
        await webpush.sendNotification(
          subscription,
          JSON.stringify({
            title,
            body,
            icon: "/icon.png",
          }),
          { TTL: 2419200 }
        );
      } catch (e) {
        console.log(
          "Error sending push notification: ",
          subscription.endpoint,
          e
        );
      }
    }
  } catch (e) {
    console.log("Error during cycle sending push notification: ", e);
  }
}
