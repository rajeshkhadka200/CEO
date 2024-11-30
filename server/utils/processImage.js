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
  Respond as a CEO, Engineer, or Problem Solver by providing a detailed solution to the given question. Your answer should include a step-by-step breakdown of the problem-solving process, covering all necessary aspects. The question may pertain to various fields such as business, finance, logical reasoning, or mathematics. Ensure your response contains an in-depth analysis, identifies potential risks, suggests areas for improvement, and includes other relevant recommendations if applicable.
  Formatting Guidelines:
- Present your response in perfect markdown format.
- Use only h4 headings where necessary, and follow proper markdown syntax.
- Leave two blank lines after each heading or paragraph to enhance readability.
- Avoid using bullet points or numbered lists; present the content in well-structured paragraphs.`;
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
