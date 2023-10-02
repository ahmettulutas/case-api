import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/helpers/jwtHelpers";
import Packages from "@/models/Packages";
import connect from "@/utils/db";

export async function POST (request: NextRequest) {
  const body = await request.json();
  const { cookies } = request;
  const { value: tokenInCookie } = cookies.get("token") ?? { value: null };
  const verifyTokenInCookie = await verifyToken(tokenInCookie ?? "");
  if(!verifyTokenInCookie || verifyTokenInCookie?.role !== "admin") return NextResponse.json({ message: "Unauthorized! You are unauthorized!" }, { status: 401 });
  try {
    const newPackage = new Packages(body);
    await connect();
    await newPackage.save();
    return NextResponse.json({ message: "Success! Packages have been created.", package: newPackage }, { status:201 });
  } catch (err: any) {
    return NextResponse.json({ message: "Error! An error occured.", error: err }, { status: 500 });
  }
};

export async function GET () { 
  try {
    await connect();
    const allPackages = await Packages.collection.find({}).toArray();
    return  NextResponse.json({ allPackages }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error! An error occured.", error: err }, { status: 500 });
  }
};
