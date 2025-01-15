const generationConfig = {
    model: "your-model-name", // Specify the model you're using
    maxOutputTokens: 500, // Set the maximum number of tokens in the response
    responseMimeType: "application/json", // Set the MIME type for the response
    temperature: 0.7, // Example of controlling randomness
    top_p: 1.0, // Example of controlling sampling
    n: 1, // Number of responses to generate
    stop: ["\n"], // Optional stopping criteria
  };
  
  export const AIDesignIdea = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: `"Design a collection of vintage-inspired logos with a hand-drawn, artistic style. Incorporate a variety of themes, including food, animals, characters, and unique brand elements. Each logo should feature bold typography, intricate details, and a retro aesthetic that is versatile and suitable for diverse brands or businesses."`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `Okay, let's dive into designing a collection of vintage-inspired, hand-drawn logos with a variety of themes. I'll focus on describing the logos rather than creating actual graphics...`,
          },
        ],
      },
    ],
  });
  
  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
  