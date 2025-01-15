"use client";
import { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";
import axios from "axios";
import { Loader2 } from "lucide-react";

const GenerateLogo = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState({});
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && userDetail?.email) {
      try {
        const storage = localStorage.getItem("formData");
        const parsedData = storage ? JSON.parse(storage) : {};
        setFormData(parsedData);
        console.log("Loaded formData:", parsedData);
      } catch (error) {
        console.error("Error parsing formData:", error);
        setError("Error loading form data");
      }
    }
  }, [userDetail]);

  useEffect(() => {
    const generateLogo = async () => {
      if (formData?.title && formData?.desc) {
        try {
          await GenerateAiLogo(formData);
        } catch (error) {
          console.error("Error generating logo:", error);
          setError("Failed to generate logo");
        }
      }
    };

    generateLogo();
  }, [formData]);

  const GenerateAiLogo = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const PROMPT = Prompt.LOGO_PROMPT
        .replace("{logoTitle}", data?.title || "")
        .replace("{logoDesc}", data?.desc || "")
        .replace("{logoColor}", data?.palette || "")
        .replace("{logoIdea}", data?.idea || "")
        .replace("{logoDesign}", data?.design?.prompt || "")
        .replace("{logoPrompt}", data?.design?.prompt || "");

      console.log("Sending prompt:", PROMPT);

      const result = await axios.post('/api/ai-logo-model', {
        prompt: PROMPT
      });

      console.log("API Response:", result.data);

      if (result?.data?.success) {
        try {
          const huggingFaceResponse = await axios.post(
            "https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA",
            { inputs: result.data.result },
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_KEY}`,
                "Content-Type": "application/json"
              },
              responseType: "arraybuffer"
            }
          );

          const buffer = Buffer.from(huggingFaceResponse.data, "binary").toString("base64");
          const base64Image = `data:image/png;base64,${buffer}`;
          setGeneratedImage(base64Image);
        } catch (error) {
          console.error("Hugging Face API Error:", error);
          throw new Error("Failed to generate image from prompt");
        }
      } else {
        throw new Error(result?.data?.error || 'Failed to generate logo');
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error);
      setError(error.response?.data?.details || error.message || "Failed to generate logo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Generate Logo</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="animate-spin h-8 w-8" />
          <span className="ml-2">Generating your logo...</span>
        </div>
      )}

      {generatedImage && (
        <div className="mt-4">
          <img 
            src={generatedImage} 
            alt="Generated Logo" 
            className="max-w-md mx-auto rounded-lg shadow-lg" 
          />
        </div>
      )}

      {formData?.desc && !isLoading && !generatedImage && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          Preparing to generate logo...
        </div>
      )}
    </div>
  );
};

export default GenerateLogo;
