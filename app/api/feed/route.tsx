import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";

export async function GET(request: NextRequest) {
  // get posts from database
  const posts = await prisma.post.findMany({});
  // return posts as json
  return NextResponse.json({ posts });
}
