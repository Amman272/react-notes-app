import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";


const router = express.Router();

// Load API key from env (you can also hardcode if testing)
const GEMINI_API_KEY = ""; // Replace with your real key

// Initialize Gemini SDK
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

router.post("/prompt", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // or "gemini-1.5-pro"

    const result = await model.generateContent(prompt+`give ans in markdown format even for line breaks but donnt menstion it `);
    const text = result.response.text();

    console.log("AI response:", text);
    res.json({ response: text });
  } catch (error) {
    console.log("Error generating AI response:", error);
    console.error("AI request error:", error);
    res.status(500).json({
      error: "AI request failed",
      details: error.message,
    });
  }
});

export default router;
