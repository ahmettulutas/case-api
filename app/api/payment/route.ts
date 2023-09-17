import { NextRequest, NextResponse } from "next/server";

import { encodedData } from "@/constants/staticResponses";
import Payment from "@/models/Payment";
import connect from "@/utils/db";

export async function POST (request: NextRequest, response: NextResponse<any>) {
  const body = await request.json();
  if(!body) return NextResponse.json({ message: "Bad Request! Missing required parameters." }, { status: 400 });
  const newPayment = new Payment(body);
  try {
    await connect();    
    await newPayment.save();
    return NextResponse.json({ message: "Payment has been successfully completed!" }, { status:201 });
  } catch (err: any) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};

export async function GET (request: NextRequest, response: NextResponse<any>) {
  try {
    return  NextResponse.json({ ...encodedData }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};