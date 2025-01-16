"use client";
import { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";

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

      const result = await axios.post("/api/ai-logo-model", {
        prompt: PROMPT,
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
                "Content-Type": "application/json",
              },
              responseType: "arraybuffer",
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
        throw new Error(result?.data?.error || "Failed to generate logo");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error);
      setError(error.response?.data?.details || error.message || "Failed to generate logo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-8">
        Generate Your Logo
      </h2>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col justify-center items-center py-16">
          {/* <Loader2 className="animate-spin h-16 w-16 text-blue-500 mb-4" /> */}
          <Image src="/loading.gif" alt="Loading animation" width={120} height={120} />
          <span className="mt-4 text-lg font-medium text-gray-700">
            Generating your logo, please wait...
            <h2 className="text-sm text-gray-500 flex items-center justify-center mt-2">
            ETA: <span className="font-semibold text-gray-800 ml-1">1m</span>
            </h2>
          </span>
        </div>
      )}

      {generatedImage && (
        <div className="mt-8 text-center">
          <img
            src={generatedImage}
            alt="Generated Logo"
            className="max-w-md mx-auto rounded-lg shadow-md"
          />
          <a
            href={generatedImage}
            download="generated-logo.png"
            className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Download Logo
          </a>
        </div>
      )}

      {!isLoading && !generatedImage && formData?.desc && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded mt-6">
          Preparing to generate your logo...
          <h2>ETA: 1m</h2>
        </div>
      )}
    </div>
  );
};

export default GenerateLogo;
