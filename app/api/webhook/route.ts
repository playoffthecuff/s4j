import { NextRequest, NextResponse } from 'next/server';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { revalidatePath } from 'next/cache';

const secret = process.env.SANITY_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readBody(request: NextRequest): Promise<string> {
  const chunks: Uint8Array[] = [];
  const reader = request.body?.getReader();
  
  if (reader) {
    let done = false;
    while (!done) {
      const { done: doneReading, value } = await reader.read();
      if (value) {
        chunks.push(value);
      }
      done = doneReading;
    }
  }
  
  return Buffer.concat(chunks).toString('utf8');
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get(SIGNATURE_HEADER_NAME) || '';
    const body = await readBody(request);

    if (!(await isValidSignature(body, signature, secret || ''))) {
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 401 }
      );
    }

    const jsonBody = JSON.parse(body);
    console.log('Payload received:', jsonBody);

    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Webhook error: ${(error as Error).message}` },
      { status: 400 }
    );
  }
}
