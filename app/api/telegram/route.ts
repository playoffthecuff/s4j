import { readBody } from "@/utils/readBody";

export type Payload = {
  message: string;
};

export async function POST(req: Request) {
  const body = await readBody(req);
  const token = process.env.TELEGRAM_BOT_TOKEN ?? "";
  const chat_id = process.env.TELEGRAM_CHAT_ID
    ? +process.env.TELEGRAM_CHAT_ID
    : 0;
  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const data: Payload = JSON.parse(body);
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id,
        text: data.message,
      }),
    });
    const text = await response.json();
    return response.ok
      ? Response.json({ success: true })
      : Response.json({ success: false, response: text }, { status: 400 });
  } catch (e) {
    console.log((e as Error).message);
    return Response.json(
      { success: false, message: "Failed to send telegram message" },
      { status: 400 },
    );
  }
}
