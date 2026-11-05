import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

// Baseline reach count starts at 0 for clean production launch
let reachCount = 0;
const visitedSessions = new Set<string>();

export async function GET() {
  try {
    const { count } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true });

    if (typeof count === "number" && count >= 0) {
      return NextResponse.json({ reachCount: count });
    }
  } catch {
    // fallback to in-memory store
  }

  return NextResponse.json({ reachCount });
}

export async function POST(req: NextRequest) {
  try {
    let visitorId = req.cookies.get("visitor_id")?.value;
    if (!visitorId) {
      visitorId = "vis_" + Math.random().toString(36).substring(2, 11);
    }

    // Only count unique visitor session once
    if (!visitedSessions.has(visitorId)) {
      visitedSessions.add(visitorId);
      reachCount += 1;

      try {
        await supabase.from("page_views").insert([
          {
            visitor_id: visitorId,
            created_at: new Date().toISOString(),
          },
        ]);
      } catch {
        // Local fallback when Supabase credentials are placeholder
      }
    }

    const response = NextResponse.json({
      success: true,
      reachCount,
    });

    if (!req.cookies.get("visitor_id")) {
      response.cookies.set("visitor_id", visitorId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
