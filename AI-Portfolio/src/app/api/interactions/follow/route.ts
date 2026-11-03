import { NextRequest, NextResponse } from "next/server";

// Simulated follower storage for local development
let globalFollowerCount = 28;
const followedVisitors = new Set<string>();

export async function GET(req: NextRequest) {
  const visitorId = req.cookies.get("visitor_id")?.value;
  const hasFollowed = visitorId ? followedVisitors.has(visitorId) : false;

  return NextResponse.json({
    count: globalFollowerCount,
    hasFollowed,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    let visitorId = req.cookies.get("visitor_id")?.value || body.visitorId;

    if (!visitorId) {
      visitorId = "vis_" + Math.random().toString(36).substring(2, 11);
    }

    if (followedVisitors.has(visitorId)) {
      return NextResponse.json({
        success: false,
        message: "You have already followed Nittaya.",
        count: globalFollowerCount,
        hasFollowed: true,
      });
    }

    followedVisitors.add(visitorId);
    globalFollowerCount += 1;

    const response = NextResponse.json({
      success: true,
      count: globalFollowerCount,
      hasFollowed: true,
    });

    response.cookies.set("visitor_id", visitorId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process follow request." },
      { status: 500 }
    );
  }
}
