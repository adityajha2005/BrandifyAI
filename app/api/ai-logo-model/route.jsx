import { NextResponse } from 'next/server';
import { startChat } from '@/app/configs/AiModel';

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json({ 
        success: false, 
        error: 'Prompt is required' 
      }, { status: 400 });
    }

    const result = await startChat(prompt);
    
    return NextResponse.json({ 
      success: true, 
      result: result 
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined 
    }, { status: 500 });
  }
}

