import { readBody } from "@/utils/readBody";
import { Payload } from "../telegram/route";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await readBody(req);
    const payload: Payload = JSON.parse(body);
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
      subject: "сообщение из формы обратной связи личного сайта",
      text: payload.message,
    };
    console.log(process.env.EMAIL_LOGIN, process.env.EMAIL_PASSWORD)
    await transporter.sendMail(mailOptions);
    return Response.json({ message: "Email sent successfully" });
  } catch (e) {
    return Response.json(
      { message: "Failed to send email", error: (e as Error).message },
      { status: 500 },
    );
  }
}
