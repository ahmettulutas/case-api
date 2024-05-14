import { NextResponse } from "next/server";

import User, { NewUserRequest, UpdateUserRequest } from "@/models/User";
import connect from "@/utils/db";

export const POST = async (request: NewUserRequest) => {
  const body = (await request.json()) as NewUserRequest;
  if (!body?.email) {
    return NextResponse.json(
      { message: "Bad Request! Missing required parameters." },
      { status: 400 }
    );
  } else {
    try {
      await connect();
      const oldUser = await User.findOne({ email: body.email });
      if (oldUser)
        return NextResponse.json(
          { message: "Error! This user already exists." },
          { status: 422 }
        );
      const newUser = await new User({ ...body });
      await newUser.save();
      return NextResponse.json(
        {
          message: `Success! User has been saved. With the randomly generated code ${newUser.code} this user can use and test the apis until ${newUser.expireDate}`,
          code: newUser.code,
          email: newUser.email,
        },
        { status: 201 }
      );
    } catch (err: any) {
      return NextResponse.json(
        { message: "Error! An error occured.", error: err },
        { status: 500 }
      );
    }
  }
};

export const PUT = async (request: UpdateUserRequest) => {
  try {
    await connect();
    const body = await request.json();
    if (!body?.email) {
      return NextResponse.json(
        { message: "Bad Request! Missing email parameter." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: body.email });
    if (!existingUser) {
      return NextResponse.json(
        { message: "Error! User not found." },
        { status: 404 }
      );
    } else {
      const updatedUser = await User.findOneAndUpdate(
        { email: body.email },
        { $set: body },
        { new: true }
      );
      return NextResponse.json(
        {
          message: "Success! User has been updated.",
          user: updatedUser,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Error! An error occurred.", error: err },
      { status: 500 }
    );
  }
};
