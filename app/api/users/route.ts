import { NextRequest, NextResponse } from "next/server";

import User from "@/models/User";
import connect from "@/utils/db";

export const POST = async (request: NextRequest, response: NextResponse<any>) => {
  const body = await request.json();
  const {fullName, email} = body;
  if(!fullName || !email) {
    NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }
  const newUser = new User(body);
  try {
    await connect();
    await newUser.save();
    return NextResponse.json({ message:"Signup completed!" },{ status:201 });
  } catch (err: any) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};

