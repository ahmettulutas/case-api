import Payment from "@/models/Payment";
import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest, response: NextResponse<any>) {
  const body = await request.json();
  const newPayment = new Payment(body);

  try {
    await connect();
    await newPayment.save();
    return NextResponse.json({ message: "Payment has been successfully completed!" },{ status:201 })
  } catch (err: any) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
};
export const GET = async (request: NextRequest, response: NextResponse<any>) => {
  const encodedData = {
  "content": "%3Cp%3E%C3%96deme%20s%C3%B6zle%C5%9Fmesi.%3C%2Fp%3E"
}
  try {
    return  NextResponse.json({...encodedData}, {status: 201})
  } catch (err) {
    return NextResponse.json({error: err}, {status: 500})
  }
};