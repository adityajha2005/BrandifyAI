import { GoogleGenerativeAI } from "@google/generative-ai";

// Add this at the top of the file to debug
console.log("GEMINI API KEY:", process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Initialize the Google AI model
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Create and export the model instance
export const AIDesignIdea = async (prompt) => {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return {
      response: {
        text: () => {
          // Ensure the response is in the expected JSON format
          try {
            return JSON.stringify({
              prompt: response.text()
            });
          } catch (error) {
            throw new Error("Failed to format AI response");
          }
        }
      }
    };
  } catch (error) {
    console.error("AI Model Error:", error);
    throw error;
  }
};

export default { AIDesignIdea };
