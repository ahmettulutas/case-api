import { NextResponse } from "next/server";

import User, { NewUserRequest } from "@/models/User";
import connect from "@/utils/db";

export const POST = async (request: NewUserRequest) => {
  const body = await request.json() as NewUserRequest;

  if(!body?.email || !body?.code) {
    return NextResponse.json({ message: "Bad Request! Missing required parameters." },{ status: 400 });    
  }

  else {
    try {
      await connect();
      const oldUser = await User.findOne({ email: body.email });
      if (oldUser) return NextResponse.json({ message: "Error! This user already exists." } , { status: 422 });
      const newUser = new User({ ...body });
      newUser.save();
      return NextResponse.json({ message:"Success! User has been saved.", code: body?.code } , { status:201 });
    }
    catch (err: any) {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
};
    

