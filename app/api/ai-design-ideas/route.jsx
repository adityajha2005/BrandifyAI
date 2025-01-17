import { AIDesignIdea } from "../../configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid or missing prompt." },
        { status: 400 }
      );
    }

    const response = await AIDesignIdea(prompt);

    return NextResponse.json({
      success: true,
      result: response,
    });
  } catch (error) {
    console.error("Route Error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}