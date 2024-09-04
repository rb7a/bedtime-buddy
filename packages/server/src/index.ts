import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Check if the API key is available
const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  console.error("OPENAI_API_KEY is not set in the environment variables");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

app.post("/generate-story", async (req, res) => {
  try {
    const {
      genre = "",
      childMood = "",
      readingTime = "",
      characters = "",
      moral = false,
      childAge = "",
      setting = "",
      theme = "",
      favoriteAnimal = "",
      learningGoal = "",
    } = req.body;

    const prompt = `Write a short bedtime story with the following characteristics:
    - Genre: ${genre || "any"}
    - For a child who is feeling: ${childMood || "any mood"}
    - Reading time: about ${readingTime || "5"} minutes
    - Number of characters: ${characters || "any"}
    - Include a moral lesson: ${moral ? "Yes" : "No"}
    - Child's age: ${childAge || "any"} years old
    - Setting: ${setting || "any"}
    - Theme: ${theme || "any"}
    - Include this animal if possible: ${favoriteAnimal || "any"}
    - Learning goal: ${learningGoal || "none specified"}

    The story should be engaging, appropriate for the child's age, and follow a clear narrative structure. Begin the story now:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const story =
      completion.choices[0]?.message?.content?.trim() ||
      "Sorry, I couldn't generate a story at this time.";

    res.json({ stories: [story] });
  } catch (error) {
    console.error("Error generating story:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the story" });
  }
});

app.post("/generate-cover", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await hf.textToImage({
      model: "stabilityai/stable-diffusion-2",
      inputs: prompt,
      parameters: {
        negative_prompt: "blurry, bad art, poor quality",
      },
    });

    // The response is a Blob, we need to convert it to a base64 string
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const imageUrl = `data:image/png;base64,${base64}`;

    res.json({ imageUrl });
  } catch (error) {
    console.error("Error generating cover:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the cover" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
