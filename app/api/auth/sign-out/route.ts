
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest):Promise<NextResponse> => {
  const cookieStore = cookies();
  try {
    /* const { url } = request; 
    const response = NextResponse.redirect(new URL("/auth/sign-in", url)); */
    cookieStore.delete("token");
    return NextResponse.json({ message: "Success! Signed out and token in the cookie has been cleared." }, { status: 200 });;
  } catch (err: any) {
    return NextResponse.json({ message: "Error! An error occured.", error: err }, { status: 500 });
  }
};
