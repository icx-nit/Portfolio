import { NextRequest, NextResponse } from "next/server";
import { initialPosts } from "@/data/portfolio-seed";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({
      posts: initialPosts,
      total: initialPosts.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve social feed posts." },
      { status: 500 }
    );
  }
}
