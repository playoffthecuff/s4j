"use server";

import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

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
      subject: "Сообщение из формы обратной связи личного сайта (ribetki.vercel.com)",
      text,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (e) {
    console.error("Fail sending email", (e as Error).message);
    return false;
  }
}
