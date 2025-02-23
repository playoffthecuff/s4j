"use server";

import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import webpush, { PushSubscription } from "web-push";
import fs from "fs/promises";

const FILE_PATH = "./subscriptions.json";

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
        "Сообщение из формы обратной связи личного сайта (ribetki.vercel.com)",
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

let subscription: PushSubscription | null = null;

async function saveSubscription(sub: PushSubscription) {
  await fs.writeFile(FILE_PATH, JSON.stringify(sub));
}

async function getSubscription(): Promise<PushSubscription | null> {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub;
  await saveSubscription(sub);
  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: sub })
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true };
}

export async function sendNotification(title: string, body: string) {
  subscription ??= await getSubscription();
  if (!subscription) {
    return;
  }

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
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
