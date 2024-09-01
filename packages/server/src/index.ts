import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

app.post("/generate-story", async (req, res) => {
  try {
    const {
      genre,
      childMood,
      readingTime,
      characters,
      moral,
      childAge,
      setting,
      theme,
      favoriteAnimal,
      learningGoal,
    } = req.body;

    const prompt = `Generate a ${genre} bedtime story for a ${childAge}-year-old child who is feeling ${childMood}. 
    The story should take about ${readingTime} minutes to read and include ${characters} characters. 
    Set the story in ${setting} and focus on the theme of ${theme}.
    Include a ${favoriteAnimal} as one of the characters if possible.
    The story should teach about ${learningGoal}.
    ${moral ? "The story should have a moral lesson." : ""}`;

    const response = await hf.textGeneration({
      model: "gpt2",
      inputs: prompt,
      parameters: {
        max_new_tokens: 250,
        return_full_text: false,
        num_return_sequences: 3,
      },
    });

    const stories = Array.isArray(response)
      ? response.map((r) => r.generated_text)
      : [response.generated_text];

    res.json({ stories });
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
