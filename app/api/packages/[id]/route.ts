import { NextRequest, NextResponse } from "next/server";

import Packages from "@/models/Packages";
import connect from "@/utils/db";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    await connect();
    const post = await Packages.findById(id);
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error! An error occured." }, { status: 401 });
  }
};