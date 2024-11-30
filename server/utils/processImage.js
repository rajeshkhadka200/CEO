import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchGraphQL } from "./api.js";

export const processImg = async (imageBuffer, description) => {
  // here description is the extra description that the user can provide

  const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMENI);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const base64Image = imageBuffer.replace(/^data:image\/png;base64,/, "");

  const prompt = "Solve the given mathematical problem."; // need to combine the prompt with the extra description and generate a question that need to pass to the modus model

  const image = {
    inlineData: {
      data: base64Image,
      mimeType: "image/png",
    },
  };
  const result = await model.generateContent([prompt, image]); // generate the question content using the gemini model.

  const INVOKE_MODEL = `
  query ProcessImage($instruction: String!, $prompt: String!){
   processImage(instruction: $instruction, prompt: $prompt)
 }
 `;

  const data = await fetchGraphQL(INVOKE_MODEL, {
    instruction: "Act as a math solver.", // give the background instruction for the modus model.
    prompt: "Solve for x if x+2=20", // prompt for the modus model.
  });
  let finalResult = {
    geneniresult: result,
    data: data.processImage,
  };
  return finalResult;
};
