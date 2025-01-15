"use client";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";

const GenerateLogo = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState({});

  // Load form data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && userDetail?.email) {
      const storage = localStorage.getItem("formData");
      try {
        const parsedData = storage ? JSON.parse(storage) : {};
        setFormData(parsedData);
        console.log("Loaded formData:", parsedData);
      } catch (error) {
        console.error("Error parsing formData from localStorage:", error);
      }
    }
  }, [userDetail]);

  // Generate logo prompt when formData changes
  useEffect(() => {
    if (formData?.title) {
      const prompt = GenerateAiLogo(formData);
      console.log("Generated Prompt:", prompt);
    } else {
      console.warn("formData is missing essential fields");
    }
  }, [formData]);

  // Function to generate the AI logo prompt
  const GenerateAiLogo = (data) => {
    const PROMPT = Prompt.LOGO_PROMPT
      .replace("{logoTitle}", data?.title || "Default Title")
      .replace("{logoDesc}", data?.desc || "Default Description")
      .replace("{logoColor}", data?.palette || "Default Color Palette")
      .replace("{logoIdea}", data?.idea || "Default Idea")
      .replace("{logoDesign}", data?.design?.prompt || "Default Design Prompt")
      .replace("{logoPrompt}", data?.design?.prompt || "Default Design Prompt");
    console.log(PROMPT);
    return PROMPT;
  };

  return (
    <div>
      <h2>GenerateLogo</h2>
      {/* {formData?.desc ? (
        <div>
          <h3>Description:</h3>
          <p>{formData.desc || "No description available"}</p>

          <h3>Design:</h3>
          <p><strong>Title:</strong> {formData.design?.title || "N/A"}</p>
          <p><strong>Prompt:</strong> {formData.design?.prompt || "N/A"}</p>
          {formData.design?.image && (
            <div>
              <h4>Design Preview:</h4>
              <img 
                src={formData.design.image} 
                alt={formData.design.title || "Design Image"} 
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          )}

          <h3>Idea:</h3>
          <p>{formData.idea || "N/A"}</p>

          <h3>Color Palette:</h3>
          <p>{formData.palette || "N/A"}</p>
        </div>
      ) : (
        <p>No form data available.</p>
      )} */}
    </div>
  );
};

export default GenerateLogo;
