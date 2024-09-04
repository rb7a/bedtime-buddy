import React, { useState } from "react";
import StoryForm from "./components/StoryForm";
import StoryList from "./components/StoryList";

interface Story {
  text: string;
  coverUrl?: string;
}

const App: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);

  const handleStoriesGenerated = (generatedStories: string[]) => {
    setStories(generatedStories.map((story) => ({ text: story })));
  };

  const handleCoverGenerated = (imageUrl: string, storyIndex: number) => {
    setStories((prevStories) => {
      const newStories = [...prevStories];
      newStories[storyIndex] = {
        ...newStories[storyIndex],
        coverUrl: imageUrl,
      };
      return newStories;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bedtime Buddy</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Generate a Story</h2>
          <StoryForm onStoriesGenerated={handleStoriesGenerated} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Generated Stories</h2>
          <StoryList
            stories={stories.map((story) => story.text)}
            onCoverGenerated={handleCoverGenerated}
          />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Generated Covers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stories.map(
            (story, index) =>
              story.coverUrl && (
                <div key={index} className="border rounded-lg p-4">
                  <img
                    src={story.coverUrl}
                    alt={`Cover for Story ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
