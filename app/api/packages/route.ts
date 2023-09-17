import { NextRequest, NextResponse } from "next/server";

import Packages from "@/models/Packages";
import connect from "@/utils/db";

export async function POST (request: NextRequest, res: NextResponse<any>) {
  const body = await request.json();
  const { code, ...rest } = body;
  if(code !== process.env.ADD_PACKAGE_CODE) {
    return NextResponse.json({ error: "Error! Please make sure you have the right code." }, { status: 500 });
  }
  else {
    const newPackage = new Packages(rest);
    try {
      await connect();
      await newPackage.save();
      return NextResponse.json({ message: "Success! Packages have been created.", package: newPackage }, { status:201 });
    } catch (err: any) {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
};

export async function GET () { 
  try {
    await connect();
    const allPackages = await Packages.collection.find({}).toArray();
    return  NextResponse.json({ allPackages }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error! An error occured.", error: err }, { status: 500 });
  }
};
