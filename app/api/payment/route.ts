import { NextRequest, NextResponse } from "next/server";

import { encodedPaymentAgreement } from "@/constants/staticResponses";
import Payment from "@/models/Payment";
import connect from "@/utils/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body)
    return NextResponse.json(
      { message: "Bad Request! Missing required parameters." },
      { status: 400 },
    );
  const newPayment = new Payment(body);
  try {
    await connect();
    await newPayment.save();
    return NextResponse.json(
      { message: "Payment has been successfully completed!" },
      { status: 201 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error! An error occured.", error: err },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({ ...encodedPaymentAgreement }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error! An error occured.", error: err },
      { status: 500 },
    );
  }
}
