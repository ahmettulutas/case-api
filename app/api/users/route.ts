import { NextRequest, NextResponse } from "next/server";

import User from "@/models/User";
import connect from "@/utils/db";

export const POST = async (request: NextRequest, response: NextResponse<any>) => {
  const body = await request.json();
  const newUser = new User(body);
  try {
    await connect();
    await newUser.save();
    return NextResponse.json({ message:"Signup completed!" },{ status:201 });
  } catch (err: any) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
export const GET = async (request: NextRequest, response: NextResponse<any>) => {
  try {
    await connect();
    const allPost = await User.collection.find({}).toArray();
    return  NextResponse.json({allPost}, {status: 201});
  } catch (err) {
    return NextResponse.json({error: err}, {status: 500});
  }
};
