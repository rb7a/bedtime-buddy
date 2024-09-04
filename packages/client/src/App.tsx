import React, { useState } from "react";
import StoryForm from "./components/StoryForm";
import StoryList from "./components/StoryList";

interface Story {
  text: string;
  coverUrl: string;
}

const App: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleStoriesGenerated = async (formData: any) => {
    setIsLoading(true);
    setStories([]); // Clear previous stories
    // Create 4 placeholder stories
    setStories(Array(4).fill({ text: "", coverUrl: "" }));

    try {
      const response = await fetch("http://localhost:3001/generate-stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setStories(data.stories);
    } catch (error) {
      console.error("Error generating stories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-[4rem] font-bold mb-8 flex justify-center">
        Bedtime Buddy
      </h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Generate Stories</h2>
        <StoryForm onStoriesGenerated={handleStoriesGenerated} />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Generated Stories</h2>
        <StoryList stories={stories} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;
