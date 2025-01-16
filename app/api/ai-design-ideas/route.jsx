// import { startChat } from "../../configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    
    // const response = await startChat(prompt);
    
    return NextResponse.json({ 
      success: true, 
      result: response 
    });
  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}