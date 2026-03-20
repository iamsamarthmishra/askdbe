import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-webhook-signature');
    const timestamp = req.headers.get('x-webhook-timestamp');

    if (!signature || !timestamp) {
       return NextResponse.json({ error: 'Missing headers' }, { status: 400 });
    }

    // Verify webhook signature (Cashfree Official Logic)
    const expectedSignature = crypto
      .createHmac('sha256', process.env.CASHFREE_SECRET_KEY || '')
      .update(timestamp + rawBody)
      .digest('base64');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);

    // If Payment Success, update Profile to Premium!
    if (payload.type === 'PAYMENT_SUCCESS_WEBHOOK') {
      const customerId = payload.data.customer_details.customer_id;

      // You must use your Service Role Key to bypass Row-Level Security!
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.SUPABASE_SERVICE_ROLE_KEY || ''
      );

      const { error } = await supabaseAdmin
        .from('profiles')
        .update({ plan: 'premium' })
        .eq('id', customerId);

      if (error) {
        console.error('Failed to update subscription:', error);
        return NextResponse.json({ error: 'Failed to update user records' }, { status: 500 });
      }
      
      console.log(`Successfully upgraded user ${customerId} to Premium.`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
