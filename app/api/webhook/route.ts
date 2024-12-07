import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidatePath } from "next/cache";
import { readBody } from "@/app/api/readBody";

const secret = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request: Request) {
  try {
    const signature = request.headers.get(SIGNATURE_HEADER_NAME) || "";
    const body = await readBody(request);

    if (!(await isValidSignature(body, signature, secret || ""))) {
      return Response.json(
        { success: false, message: "Invalid signature" },
        { status: 401 },
      );
    }

    revalidatePath("/");

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { success: false, message: `Webhook error: ${(error as Error).message}` },
      { status: 400 },
    );
  }
}
