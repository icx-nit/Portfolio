import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const STORE_PATH = path.join(process.cwd(), "src/data/cms-store.json");

function loadLikesStore() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && parsed.likes) {
        return {
          counts: parsed.likes.counts || {},
          visitorLikes: parsed.likes.visitorLikes || {},
        };
      }
    }
  } catch (e) {
    console.error("[Like API] Error reading cms-store.json:", e);
  }
  return { counts: {}, visitorLikes: {} };
}

function saveLikesStore(likes: { counts: Record<string, number>; visitorLikes: Record<string, string[]> }) {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      parsed.likes = likes;
      fs.writeFileSync(STORE_PATH, JSON.stringify(parsed, null, 2), "utf-8");
    }
  } catch (e) {
    console.error("[Like API] Error writing cms-store.json:", e);
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const targetId = url.searchParams.get("targetId") || url.searchParams.get("projectId") || "ai-portfolio";
  const visitorId = req.cookies.get("visitor_id")?.value || url.searchParams.get("visitorId");

  const store = loadLikesStore();
  const count = store.counts[targetId] || 0;
  const isLiked = visitorId && store.visitorLikes[visitorId]
    ? store.visitorLikes[visitorId].includes(targetId)
    : false;

  return NextResponse.json({ targetId, count, isLiked });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const targetId = body.targetId || body.projectId;
    const targetType = body.targetType || "project"; // 'project' | 'post' | 'portfolio'

    if (!targetId) {
      return NextResponse.json({ error: "targetId is required" }, { status: 400 });
    }

    let visitorId = req.cookies.get("visitor_id")?.value || body.visitorId;
    if (!visitorId) {
      visitorId = "vis_" + Math.random().toString(36).substring(2, 11);
    }

    const store = loadLikesStore();
    if (!store.visitorLikes[visitorId]) {
      store.visitorLikes[visitorId] = [];
    }

    const userLikedList = store.visitorLikes[visitorId];
    const isLiked = userLikedList.includes(targetId);

    if (isLiked) {
      // Unlike
      store.visitorLikes[visitorId] = userLikedList.filter((id: string) => id !== targetId);
      store.counts[targetId] = Math.max(0, (store.counts[targetId] || 1) - 1);
      saveLikesStore(store);

      return NextResponse.json({
        success: true,
        action: "unliked",
        count: store.counts[targetId],
        isLiked: false,
        targetType,
      });
    }

    // Like
    userLikedList.push(targetId);
    store.counts[targetId] = (store.counts[targetId] || 0) + 1;
    saveLikesStore(store);

    const response = NextResponse.json({
      success: true,
      action: "liked",
      count: store.counts[targetId],
      isLiked: true,
      targetType,
    });

    response.cookies.set("visitor_id", visitorId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process like action." },
      { status: 500 }
    );
  }
}
