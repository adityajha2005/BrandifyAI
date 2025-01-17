import { GoogleGenerativeAI } from "@google/generative-ai";

// Add this debug log to verify the API key is available
if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  console.error('GEMINI API KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export const startChat = async (prompt) => {
  try {
    console.log('Starting AI generation with prompt:', prompt); // Debug log
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    const response = await result.response;
    console.log('AI Response:', response.text()); // Debug log
    return response.text();
  } catch (error) {
    console.error("AI Model Error:", error);
    throw error;
  }
};

export default { startChat };
