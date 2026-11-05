import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";
import { initialPosts } from "@/data/portfolio-seed";

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return NextResponse.json({
        posts: initialPosts,
        total: initialPosts.length,
        source: "seed",
      });
    }

    const mappedPosts = data.map((post) => ({
      id: post.id,
      author: {
        name: "Nittaya Pana",
        username: "icx-nit",
        role: "Software Developer",
        avatar: "/avatar.png",
      },
      content: post.content,
      contentTh: post.content_th || post.content,
      category: post.category || "Announcement",
      categoryTh: post.category_th || "ประกาศทางการ",
      likesCount: post.likes_count || 0,
      timestamp: post.published_at ? new Date(post.published_at).toLocaleDateString() : "Just now",
      tags: ["announcement", "portfolio", "nextjs"],
    }));

    return NextResponse.json({
      posts: mappedPosts,
      total: mappedPosts.length,
      source: "supabase",
    });
  } catch (error) {
    return NextResponse.json({
      posts: initialPosts,
      total: initialPosts.length,
      source: "fallback",
    });
  }
}
