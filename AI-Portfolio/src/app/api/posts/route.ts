import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { initialPosts } from "@/data/portfolio-seed";

const STORE_PATH = path.join(process.cwd(), "src/data/cms-store.json");

function getStorePosts() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.posts)) {
        return parsed.posts;
      }
    }
  } catch (e) {
    console.error("[Posts API] Failed to read cms-store.json:", e);
  }
  return initialPosts;
}

export async function GET(req: NextRequest) {
  try {
    const currentPosts = getStorePosts();
    return NextResponse.json({
      posts: currentPosts,
      total: currentPosts.length,
      source: "cms-store",
    });
  } catch (error) {
    return NextResponse.json({
      posts: initialPosts,
      total: initialPosts.length,
      source: "fallback",
    });
  }
}
