import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

// In-memory set of followed visitors for accurate toggle
const followedVisitors = new Set<string>();

export async function GET(req: NextRequest) {
  const visitorId = req.cookies.get("visitor_id")?.value;
  let hasFollowed = visitorId ? followedVisitors.has(visitorId) : false;
  let count = followedVisitors.size;

  try {
    const { count: dbCount } = await supabase.from("follows").select("*", { count: "exact", head: true });
    if (typeof dbCount === "number" && dbCount >= 0) {
      count = dbCount;
    }
    if (visitorId) {
      const { data } = await supabase.from("follows").select("id").eq("visitor_id", visitorId).maybeSingle();
      if (data) {
        hasFollowed = true;
        followedVisitors.add(visitorId);
      }
    }
  } catch {
    // fallback to in-memory
  }

  return NextResponse.json({
    count,
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

    const isCurrentlyFollowed = followedVisitors.has(visitorId);
    const shouldUnfollow = body.action === "unfollow" || (body.action !== "follow" && isCurrentlyFollowed);

    if (shouldUnfollow) {
      // Unfollow action: count becomes 0 (or decrements)
      followedVisitors.delete(visitorId);
      try {
        await supabase.from("follows").delete().eq("visitor_id", visitorId);
      } catch {
        // ignore
      }

      const response = NextResponse.json({
        success: true,
        action: "unfollowed",
        count: followedVisitors.size,
        hasFollowed: false,
      });

      response.cookies.set("visitor_id", visitorId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });

      return response;
    }

    // Follow action: count becomes 1
    followedVisitors.add(visitorId);
    try {
      await supabase.from("follows").insert([{ visitor_id: visitorId }]);
    } catch {
      // ignore
    }

    const response = NextResponse.json({
      success: true,
      action: "followed",
      count: followedVisitors.size,
      hasFollowed: true,
    });

    response.cookies.set("visitor_id", visitorId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    console.error("Follow error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
