import Packages from "@/models/Packages";
import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, res: NextResponse<any>) => {
  const body = await request.json();
  const {code, ...rest} = body;
  if(code !== process.env.ADD_PACKAGE_CODE) {
    return NextResponse.json({ error: "Please make sure you have the right code" }, { status: 500 })
  }
  else {
  const newPackage = new Packages(rest);
  try {
    await connect();
    newPackage.save();
    return NextResponse.json({ message:"Packages have been created.", package: body },{ status:201 })
  } catch (err: any) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
  }
};

export const GET = async (request: NextRequest, res: NextResponse<any>) => {
  try {
    await connect();
    const allPackages = await Packages.collection.find({}).toArray();
    return  NextResponse.json({allPackages}, {status: 201})
  } catch (err) {
    return NextResponse.json({error: err}, {status: 500});
  }
};
