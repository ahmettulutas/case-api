import { NextRequest, NextResponse } from "next/server";

import User from "@/models/User";
import connect from "@/utils/db";

export default async function checkIsAuthenticated(request: NextRequest) {
  const token  = request.headers.get("token"); 
  if(!token) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Bad request! Please make sure to add your code to the Headers as token." }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }
  try {
    await connect();
    const user = await User.findOne({
      role: token,
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Unauthorized! You are not authorized to access." }),
        { status: 401, headers: { "content-type": "application/json" } }
      );
    }
    return NextResponse.next();

  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({ success: false, message: JSON.stringify(err) }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}