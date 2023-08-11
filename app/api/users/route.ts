import { NextRequest, NextResponse } from "next/server";

/* import User from "@/models/User";
import connect from "@/utils/db"; */

export const POST = async (request: NextRequest, response: NextResponse<any>) => {
  const body = await request.json();
    try {
      /*     await connect();
      await newUser.save(); */ /* COMMENTED OUT FOR NOW BECAUSE WE DONT NEED TO SAVE USER INFO TO MONGODB */

      if(!body?.fullName || !body?.email) {
    return NextResponse.json({ message:"Bad Request. Missing required parameters." },{ status: 400 });    
      }
      else {

        return NextResponse.json({ message:"Signup completed!" },{ status:201 });
      }
  }
 catch (err: any) {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  };

