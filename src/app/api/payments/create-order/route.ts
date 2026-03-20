import { NextResponse } from 'next/server';
import { createServer } from '@/lib/supabase/server';

export async function POST() {
  const supabase = await createServer();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized: Invalid Session" }, { status: 401 });
  }

  const payload = {
    order_amount: 2999,
    order_currency: "INR",
    customer_details: {
      customer_id: user.id,
      customer_email: user.email,
      customer_phone: "9999999999" // Use a static test phone for sandbox processing
    },
    order_meta: {
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard?status=success`
    }
  };

  try {
    const isProd = (process.env.CASHFREE_SECRET_KEY || "").includes("_prod_");
    const endpoint = isProd ? "https://api.cashfree.com/pg/orders" : "https://sandbox.cashfree.com/pg/orders";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CASHFREE_APP_ID || "",
        "x-client-secret": process.env.CASHFREE_SECRET_KEY || "",
        "x-api-version": "2023-08-01",
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({ error: data.message }, { status: response.status });
    }

    return NextResponse.json({ 
      payment_session_id: data.payment_session_id,
      environment: isProd ? 'production' : 'sandbox'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
