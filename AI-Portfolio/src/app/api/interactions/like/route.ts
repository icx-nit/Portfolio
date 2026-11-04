import { NextRequest, NextResponse } from "next/server";

// In-memory like counters for local state
const likesMap = new Map<string, number>([
  ["ai-portfolio", 14],
  ["academic-management-system", 8],
  ["dev-insights-hub", 11],
  ["post-launch", 19],
  ["post-coursework", 12],
  ["portfolio-main", 33],
]);

const visitorLikedItems = new Map<string, Set<string>>();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const targetId = url.searchParams.get("targetId") || url.searchParams.get("projectId") || "ai-portfolio";
  const visitorId = req.cookies.get("visitor_id")?.value;

  const count = likesMap.get(targetId) || 0;
  const isLiked = visitorId ? visitorLikedItems.get(visitorId)?.has(targetId) ?? false : false;

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

    let visitorId = req.cookies.get("visitor_id")?.value;
    if (!visitorId) {
      visitorId = "vis_" + Math.random().toString(36).substring(2, 11);
    }

    if (!visitorLikedItems.has(visitorId)) {
      visitorLikedItems.set(visitorId, new Set());
    }

    const userLikedSet = visitorLikedItems.get(visitorId)!;

    if (userLikedSet.has(targetId)) {
      // Unlike
      userLikedSet.delete(targetId);
      const current = likesMap.get(targetId) || 1;
      likesMap.set(targetId, Math.max(0, current - 1));

      return NextResponse.json({
        success: true,
        action: "unliked",
        count: likesMap.get(targetId),
        isLiked: false,
        targetType,
      });
    }

    // Like
    userLikedSet.add(targetId);
    const current = likesMap.get(targetId) || 0;
    likesMap.set(targetId, current + 1);

    const response = NextResponse.json({
      success: true,
      action: "liked",
      count: likesMap.get(targetId),
      isLiked: true,
      targetType,
    });

    response.cookies.set("visitor_id", visitorId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
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
