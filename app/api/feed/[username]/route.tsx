import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    // Get the user ID associated with the username
    const user = await prisma.user.findUnique({
      where: {
        username: params.username,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    // Get posts from the database
    const posts = await prisma.post.findMany({
      where: {
        authorId: user.id,
      },
      include: {
        author: true, // Include author details in the response
      },
    });
    console.log("User ID: ", user.id);
    console.log("Posts: ", posts);

    // Return posts as JSON
    return NextResponse.json({ posts });
  } catch (error) {
    // Handle any errors
    console.error(error);
    return NextResponse.json({
      error: "An error occurred while fetching the posts",
    });
  }
}
