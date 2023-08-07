import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import Packages from "@/models/Packages";

export const GET = async (request: NextRequest, {params}: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connect();
    const post = await Packages.findById(id);
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};