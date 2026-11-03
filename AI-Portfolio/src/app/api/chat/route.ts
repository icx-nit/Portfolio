import { NextRequest, NextResponse } from "next/server";
import { queryPortfolioChatbot } from "@/lib/chatbot/search-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a valid string." },
        { status: 400 }
      );
    }

    const response = queryPortfolioChatbot(message);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        answer: "An unexpected error occurred while processing your question.",
        isFallback: true,
      },
      { status: 500 }
    );
  }
}
