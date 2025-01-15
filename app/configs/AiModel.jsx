import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("GEMINI API KEY:", process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export const AIDesignIdea = async (prompt) => {
  try {
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
    const text = response.text();
    
    return {
      response: {
        text: () => text
      }
    };
  } catch (error) {
    console.error("AI Model Error:", error);
    throw error;
  }
};

export default { AIDesignIdea };
