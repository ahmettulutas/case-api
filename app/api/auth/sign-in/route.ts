import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { generateToken } from "@/helpers/jwtHelpers";
import { checkStringsEqual } from "@/helpers/passwordMatcher";
import User, { NewUserRequest, UserType } from "@/models/User";
import connect from "@/utils/db";

export type UserResponse = { message: string, token?: string, user?: UserType, error?: any };

export const POST = async (request: NewUserRequest):Promise<NextResponse<UserResponse>>=> {
  const body = await request.json();
  const { email, code } = body;
  if(!email || !code) return NextResponse.json({ message: "Bad Request! Missing required parameters. Please make sure to add email and code parameters to the body." }, { status: 400 });

  try {
    await connect();
    const user = await User.findOne({ email });
    if (!user || !checkStringsEqual(code, user.code)) {
      return NextResponse.json({ message: "Bad Request! Invalid credentials." }, { status: 401 });
    }
    // Check if the user's account has expired.
    const expireDate = new Date(user.expireDate);
    const currentDate = new Date();
    if (expireDate < currentDate) return NextResponse.json({ message: "Oppss! Your account has expired." }, { status: 401 });
    
    // Generate and set the token to the cookie.
    const generatedToken = await generateToken({ id: user.id, email: user.email, code: user.code, role: user.role });
    const cookieStore = cookies();
    cookieStore.set("token", generatedToken);
    const response = NextResponse.json({ message: "Success! Signed in.", token: generatedToken, user }, { status: 201 });
    return response;

  } catch (err: any) {
    return NextResponse.json({ message: "Error! An error occured.", error: err }, { status: 500 });
  }
};
