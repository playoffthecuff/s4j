import { readBody } from "@/app/api/readBody";
import { sendNotification } from "@/lib/actions";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidatePath } from "next/cache";

const secret = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request: Request) {
  try {
    const signature = request.headers.get(SIGNATURE_HEADER_NAME) || "";
    const body = await readBody(request);

    if (!(await isValidSignature(body, signature, secret || ""))) {
      return Response.json(
        { success: false, message: "Invalid signature" },
        { status: 401 }
      );
    }

    revalidatePath("/", "layout");

    const message = "Content updated. Контент обновлён.";
    const title = "Check the site. Проверьте сайт.";
    const notificationResult = await sendNotification(title, message);
    const success = notificationResult?.success ?? false;
    return Response.json({ success });
  } catch (error) {
    return Response.json(
      { success: false, message: `Webhook error: ${(error as Error).message}` },
      { status: 400 }
    );
  }
}
