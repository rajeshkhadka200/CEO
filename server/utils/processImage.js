import { GoogleGenerativeAI } from "@google/generative-ai";

export const processImg = async (imageBuffer, description) => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMENI);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  // Extract the base64 string by removing the prefix
  const base64Image = imageBuffer.replace(/^data:image\/png;base64,/, "");
  const prompt = "Solve the given mathematical problem.";

  const image = {
    inlineData: {
      data: base64Image,
      mimeType: "image/png",
    },
  };
  const result = await model.generateContent([prompt, image]);
  return result;
};
