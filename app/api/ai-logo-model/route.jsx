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

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Parse error:", parseError);
        // If parsing fails, wrap the response in the expected format
        parsedResponse = { prompt: responseText };
      }

      if (!parsedResponse.prompt) {
        throw new Error("Missing prompt in response");
      }

      return NextResponse.json({ 
        success: true,
        result: parsedResponse.prompt 
      });

    } catch (error) {
      console.error("AI Processing Error:", error);
      return NextResponse.json(
        { 
          error: "AI processing failed", 
          details: error.message,
          stack: error.stack 
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
