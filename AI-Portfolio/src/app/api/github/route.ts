import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET(req: NextRequest) {
  const username = process.env.GITHUB_USERNAME || "icx-nit";
  const token = process.env.GITHUB_TOKEN;

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Nittaya-Pana-Portfolio",
    };

    if (token && !token.includes("optional_github")) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      // Fallback data if rate limit or network error
      return NextResponse.json({
        repositories: [
          {
            name: "AI-Portfolio",
            description: "Personal developer portfolio website with Clyde luxury dark theme and AI assistant.",
            language: "TypeScript",
            html_url: `https://github.com/${username}/AI-Portfolio`,
            stargazers_count: 5,
            forks_count: 1,
            updated_at: new Date().toISOString(),
          },
          {
            name: "software-engineering-up",
            description: "Coursework and software engineering projects at University of Phayao.",
            language: "JavaScript",
            html_url: `https://github.com/${username}`,
            stargazers_count: 2,
            forks_count: 0,
            updated_at: new Date().toISOString(),
          },
        ],
        isFallback: true,
      });
    }

    const data = await res.json();
    const repositories = data.map((repo: any) => ({
      name: repo.name,
      description: repo.description || "Software development repository",
      language: repo.language || "TypeScript",
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at,
    }));

    return NextResponse.json({ repositories, isFallback: false });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to retrieve GitHub repositories at this time." },
      { status: 500 }
    );
  }
}
