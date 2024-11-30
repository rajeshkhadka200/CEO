import { processImg } from "../utils/processImage.js";
export const getDraw = async (req, res) => {
  try {
    const { description, image } = req.body;
    const result = await processImg(image, description);

    res.status(200).json({
      message: "Image processed successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .send({ error: error.message, message: "Error processing image" });
  }
};
