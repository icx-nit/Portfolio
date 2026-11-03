import { NextRequest, NextResponse } from "next/server";

// In-memory like tracker for local state
const projectLikesMap = new Map<string, number>([
  ["ai-portfolio", 14],
  ["academic-management-system", 8],
  ["dev-insights-hub", 11],
]);

const visitorLikedProjects = new Map<string, Set<string>>();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const projectId = url.searchParams.get("projectId") || "ai-portfolio";
  const visitorId = req.cookies.get("visitor_id")?.value;

  const count = projectLikesMap.get(projectId) || 0;
  const isLiked = visitorId
    ? visitorLikedProjects.get(visitorId)?.has(projectId) ?? false
    : false;

  return NextResponse.json({ projectId, count, isLiked });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId } = body;

    if (!projectId) {
      return NextResponse.json({ error: "projectId is required" }, { status: 400 });
    }

    let visitorId = req.cookies.get("visitor_id")?.value;
    if (!visitorId) {
      visitorId = "vis_" + Math.random().toString(36).substring(2, 11);
    }

    if (!visitorLikedProjects.has(visitorId)) {
      visitorLikedProjects.set(visitorId, new Set());
    }

    const userLikedSet = visitorLikedProjects.get(visitorId)!;

    if (userLikedSet.has(projectId)) {
      // Unlike
      userLikedSet.delete(projectId);
      const current = projectLikesMap.get(projectId) || 1;
      projectLikesMap.set(projectId, Math.max(0, current - 1));

      return NextResponse.json({
        success: true,
        action: "unliked",
        count: projectLikesMap.get(projectId),
        isLiked: false,
      });
    }

    // Like
    userLikedSet.add(projectId);
    const current = projectLikesMap.get(projectId) || 0;
    projectLikesMap.set(projectId, current + 1);

    const response = NextResponse.json({
      success: true,
      action: "liked",
      count: projectLikesMap.get(projectId),
      isLiked: true,
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
