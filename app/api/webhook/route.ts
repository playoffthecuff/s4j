import crypto from 'crypto';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const secret = process.env.SANITY_WEBHOOK_SECRET || '';
    const signatureHeader = request.headers.get('sanity-webhook-signature') || '';

    const [timestamp, signature] = signatureHeader.split(',').map((part) => part.split('=')[1]);

    const body = await request.text();

    const requestAge = Date.now() - Number(timestamp);
    if (requestAge > 3e5) {
      return new Response('Request is too old.', { status: 400 });
    }

    const hmac = crypto.createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex');

    if (crypto.timingSafeEqual(Buffer.from(hmac, 'hex'), Buffer.from(signature, 'hex'))) {
      console.log('[Next.js] Revalidating /');
      revalidatePath('/');
      return new Response('Cache updated!', { status: 200 });
    } else {
      return new Response('Invalid signature.', { status: 400 });
    }
  } catch (error) {
    if (error instanceof Error) return new Response(`Webhook error: ${error.message}`, { status: 400 });
  }
}
