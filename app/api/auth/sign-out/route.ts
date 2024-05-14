import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
  const cookieStore = cookies();
  try {
    cookieStore.delete("token");
    return NextResponse.json(
      {
        message:
          "Success! Signed out and token in the cookie has been cleared.",
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error! An error occured.", error: err },
      { status: 500 }
    );
  }
};
