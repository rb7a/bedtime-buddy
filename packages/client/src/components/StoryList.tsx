import React from "react";
import axios from "axios";

interface StoryListProps {
  stories: string[];
  onCoverGenerated: (imageUrl: string, storyIndex: number) => void;
}

const StoryList: React.FC<StoryListProps> = ({ stories, onCoverGenerated }) => {
  const generateCover = async (story: string, index: number) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/generate-cover",
        {
          prompt: `Book cover for a children's story: ${story.substring(
            0,
            100
          )}...`,
        }
      );
      onCoverGenerated(response.data.imageUrl, index);
    } catch (error) {
      console.error("Error generating cover:", error);
    }
  };

  return (
    <div className="space-y-4">
      {stories.map((story, index) => (
        <div key={index} className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Story {index + 1}</h3>
          <p className="mb-4">
            {story || "No story generated. Please try again."}
          </p>
          {story && (
            <button
              onClick={() => generateCover(story, index)}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Generate Cover
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default StoryList;
