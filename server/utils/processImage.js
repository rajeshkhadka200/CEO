import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchGraphQL } from "./api.js";

export const processImg = async (imageBuffer, description) => {
  // here description is the extra description that the user can provide

  const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMENI);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const base64Image = imageBuffer.replace(/^data:image\/png;base64,/, "");

  const prompt = `
  Given an image and its accompanying description, analyze both elements and create a relevant question that accurately reflects the content of the image based on the provided description. In the image, it could include any content, mathematical expressions, code blocks, or a question related to finance, business, or anything that exists. So, make sure to address all possible elements. Description: ${description}. 
  The question should be descriptive and easily understandable.
  Note: Make sure you provide the result in perfect markdown format. If there is a mathematical expression, make sure to use the correct markdown syntax to represent it and rewrite the question accordingly.
  `; // need to combine the prompt with the extra description and generate a question that need to pass to the modus model

  const image = {
    inlineData: {
      data: base64Image,
      mimeType: "image/png",
    },
  };
  const result = await model.generateContent([prompt, image]); // generate the question content using the gemini model.
  const question = result.response.text();

  const INVOKE_MODEL = `
  query ProcessImage($instruction: String!, $prompt: String!){
   processImage(instruction: $instruction, prompt: $prompt)
 }
 `;

  let prompttoModus = `
  Act as a CEO, Engineer, or Problem Solver and provide a relevant answer to the given question. Ensure that you break down all the necessary steps to solve the problem. The problem could span across various domains, including business, finance, logical reasoning, or mathematics. Your answer should include an in-depth analysis of the problem, potential risk factors, ways to improve, and other relevant suggestions (if applicable to the question). 
  Note: Make sure you provide the answer in perfect markdown format. Do not use too large headings(strictly always use h4 headings). Use the correct markdown syntax to represent the content and rewrite the answer accordingly. Always leave two line extra after completing one paragraph to maintain readability. 
  `;
  const data = await fetchGraphQL(INVOKE_MODEL, {
    instruction: prompttoModus, // give the background instruction for the modus model.
    prompt: question, // prompt for the modus model.
  });
  let finalResult = {
    que: result.response.text(),
    ans: data.processImage,
  };
  return finalResult;
};
