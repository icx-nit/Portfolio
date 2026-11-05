import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/users/icx-nit", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Nittaya-Portfolio-App",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      // Fallback gracefully if rate-limited or offline
      return NextResponse.json({ followers: 10, publicRepos: 8, source: "fallback" });
    }

    const data = await res.json();
    return NextResponse.json({
      followers: typeof data.followers === "number" ? data.followers : 10,
      publicRepos: typeof data.public_repos === "number" ? data.public_repos : 8,
      source: "github-api",
    });
  } catch (err) {
    console.error("GitHub API error:", err);
    return NextResponse.json({ followers: 10, publicRepos: 8, source: "fallback" });
  }
}
