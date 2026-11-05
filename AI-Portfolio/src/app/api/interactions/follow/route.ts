import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase/client";

const STORE_PATH = path.join(process.cwd(), "src/data/cms-store.json");

interface FollowerRecord {
  id: string;
  followedAt: string;
  device?: string;
}

interface FollowersStore {
  count: number;
  visitors: FollowerRecord[];
}

function loadFollowersFromStore(): FollowersStore {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && parsed.followers) {
        const visitors: FollowerRecord[] = Array.isArray(parsed.followers.visitors)
          ? parsed.followers.visitors
          : [];
        const count =
          typeof parsed.followers.count === "number"
            ? Math.max(parsed.followers.count, visitors.length)
            : visitors.length;
        return { count, visitors };
      }
    }
  } catch (e) {
    console.error("[Follow API] Error reading cms-store.json:", e);
  }
  return { count: 0, visitors: [] };
}

function saveFollowersToStore(followers: FollowersStore) {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      parsed.followers = followers;
      fs.writeFileSync(STORE_PATH, JSON.stringify(parsed, null, 2), "utf-8");
    }
  } catch (e) {
    console.error("[Follow API] Error writing cms-store.json:", e);
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const visitorId =
    req.cookies.get("visitor_id")?.value || url.searchParams.get("visitorId");
  const store = loadFollowersFromStore();

  let hasFollowed = false;
  if (visitorId) {
    hasFollowed = store.visitors.some((v) => v.id === visitorId);
  }

  // Also check Supabase if available
  try {
    const { count: dbCount } = await supabase
      .from("follows")
      .select("*", { count: "exact", head: true });
    if (typeof dbCount === "number" && dbCount >= 0) {
      store.count = Math.max(store.count, dbCount);
    }
    if (visitorId && !hasFollowed) {
      const { data } = await supabase
        .from("follows")
        .select("id")
        .eq("visitor_id", visitorId)
        .maybeSingle();
      if (data) {
        hasFollowed = true;
        store.visitors.push({
          id: visitorId,
          followedAt: new Date().toISOString(),
          device: "Web Browser",
        });
        saveFollowersToStore(store);
      }
    }
  } catch {
    // ignore
  }

  return NextResponse.json({
    count: Math.max(store.count, store.visitors.length),
    hasFollowed,
    visitors: store.visitors,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    let visitorId =
      req.cookies.get("visitor_id")?.value || body.visitorId;

    if (!visitorId) {
      visitorId = "vis_" + Math.random().toString(36).substring(2, 11);
    }

    const userAgent = req.headers.get("user-agent") || "";
    const deviceType = userAgent.includes("Mobile")
      ? "Mobile Browser"
      : "Desktop Browser";

    const store = loadFollowersFromStore();
    const existingIndex = store.visitors.findIndex((v) => v.id === visitorId);
    const isCurrentlyFollowed = existingIndex !== -1;
    const shouldUnfollow =
      body.action === "unfollow" ||
      (body.action !== "follow" && isCurrentlyFollowed);

    if (shouldUnfollow) {
      if (existingIndex !== -1) {
        store.visitors.splice(existingIndex, 1);
      }
      store.count = Math.max(0, store.visitors.length);
      saveFollowersToStore(store);

      try {
        await supabase.from("follows").delete().eq("visitor_id", visitorId);
      } catch {
        // ignore
      }

      const response = NextResponse.json({
        success: true,
        action: "unfollowed",
        count: store.count,
        hasFollowed: false,
        visitorId,
        visitors: store.visitors,
      });

      response.cookies.set("visitor_id", visitorId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });

      return response;
    }

    // Follow action
    if (existingIndex === -1) {
      store.visitors.unshift({
        id: visitorId,
        followedAt: new Date().toISOString(),
        device: deviceType,
      });
    }
    store.count = Math.max(store.count, store.visitors.length);
    saveFollowersToStore(store);

    try {
      await supabase.from("follows").insert([{ visitor_id: visitorId }]);
    } catch {
      // ignore
    }

    const response = NextResponse.json({
      success: true,
      action: "followed",
      count: store.count,
      hasFollowed: true,
      visitorId,
      visitors: store.visitors,
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

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const store = loadFollowersFromStore();

    if (body.action === "reset") {
      store.count = 0;
      store.visitors = [];
    } else if (typeof body.count === "number") {
      store.count = Math.max(0, body.count);
    } else if (body.removeVisitorId) {
      store.visitors = store.visitors.filter((v) => v.id !== body.removeVisitorId);
      store.count = Math.max(0, store.visitors.length);
    }

    saveFollowersToStore(store);

    return NextResponse.json({
      success: true,
      count: store.count,
      visitors: store.visitors,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
