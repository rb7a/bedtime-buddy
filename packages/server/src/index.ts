import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate-stories", async (req, res) => {
  try {
    const {
      genre = "",
      childMood = "",
      readingTime = "",
      characters = "",
      moral = false,
      childAge = "",
    } = req.body;

    const stories = [];

    for (let i = 0; i < 4; i++) {
      const prompt = `Write a short bedtime story with the following characteristics:
        - Genre: ${genre || "any"}
        - For a child who is feeling: ${childMood || "any mood"}
        - Reading time: about ${readingTime || "5"} minutes
        - Number of characters: ${characters || "any"}
        - Include a moral lesson: ${moral ? "Yes" : "No"}
        - Child's age: ${childAge || "any"} years old

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

      // Generate a cover for the story
      const coverPrompt = `Book cover for a children's story: ${story.substring(
        0,
        100
      )}...`;
      const encodedPrompt = encodeURIComponent(coverPrompt);
      const coverUrl = `https://pollinations.ai/p/${encodedPrompt}`;

      stories.push({ text: story, coverUrl });
    }

    res.json({ stories });
  } catch (error) {
    console.error("Error generating stories:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the stories" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
