import { NextResponse } from "next/server";
import { AIDesignIdea } from "@/app/configs/AiModel";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" }, 
        { status: 400 }
      );
    }

    try {
      const AIPromptResult = await AIDesignIdea(prompt);
      
      if (!AIPromptResult?.response?.text) {
        throw new Error("Invalid AI response structure");
      }

      const responseText = AIPromptResult.response.text();
      console.log("Raw AI Response:", responseText);

      return NextResponse.json({ 
        success: true,
        result: responseText 
      });

    } catch (error) {
      console.error("AI Processing Error:", error);
      return NextResponse.json(
        { 
          error: "AI processing failed", 
          details: error.message
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Request Error:", error);
    return NextResponse.json(
      { error: "Invalid request", details: error.message },
      { status: 400 }
    );
  }
}
