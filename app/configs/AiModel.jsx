import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google AI model
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Export the startChat function
export const startChat = async (prompt) => {
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
    return response.text();
  } catch (error) {
    console.error("AI Model Error:", error);
    throw error;
  }
};

// Export as default and named export
export default { startChat };
