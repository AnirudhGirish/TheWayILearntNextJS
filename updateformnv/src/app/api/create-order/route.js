import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Number(process.env.AMOUNT),
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ order_id: order.id, order, success:true, message: 'Order created successfully'},{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({success:false, message: 'Order creation failed' }, { status: 500 });
  }
}