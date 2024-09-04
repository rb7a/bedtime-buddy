import React, { useState } from "react";
import LoadingIndicator from "./LoadingIndicator";

interface Story {
  text: string;
  coverUrl: string;
}

interface StoryListProps {
  stories: Story[];
  isLoading: boolean;
}

const StoryList: React.FC<StoryListProps> = ({ stories, isLoading }) => {
  const [expandedStory, setExpandedStory] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {stories.map((story, index) => (
        <div key={index} className="border rounded-lg p-4 h-[25rem]">
          {isLoading || !story.coverUrl ? (
            <LoadingIndicator />
          ) : (
            <>
              <img
                src={story.coverUrl}
                alt={`Cover for Story ${index + 1}`}
                className="w-full h-full object-cover mb-4 cursor-pointer"
                onClick={() =>
                  setExpandedStory(expandedStory === index ? null : index)
                }
              />
              <h3 className="text-lg font-semibold mb-2">Story {index + 1}</h3>
              {expandedStory === index && (
                <p className="mb-4 overflow-y-auto">{story.text}</p>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default StoryList;
