import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Lemon Squeezy webhook — optional but recommended for logging purchases.
 * In Lemon Squeezy: Settings → Webhooks → add https://yoursite.com/api/webhooks/lemon-squeezy
 * Events: subscription_created, subscription_updated, order_created
 */
export async function POST(request: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get('x-signature') ?? '';

  const digest = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

  if (signature !== digest) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // Extend later: sync to DB, send custom emails, etc.
  // eslint-disable-next-line no-console
  console.log('[lemon-squeezy webhook]', rawBody.slice(0, 200));

  return NextResponse.json({ received: true });
}
