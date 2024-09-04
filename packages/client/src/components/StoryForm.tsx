import React, { useState } from "react";

interface StoryFormProps {
  onStoriesGenerated: (formData: any) => void;
}

const StoryForm: React.FC<StoryFormProps> = ({ onStoriesGenerated }) => {
  const [genre, setGenre] = useState("");
  const [childMood, setChildMood] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [characters, setCharacters] = useState("");
  const [moral, setMoral] = useState(false);
  const [childAge, setChildAge] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStoriesGenerated({
      genre,
      childMood,
      readingTime,
      characters,
      moral,
      childAge,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="flex">
        <div className="w-1/2 mr-3 space-y-4">
          <div>
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-700"
            >
              Genre
            </label>
            <input
              type="text"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="childMood"
              className="block text-sm font-medium text-gray-700"
            >
              Child's Mood
            </label>
            <input
              type="text"
              id="childMood"
              value={childMood}
              onChange={(e) => setChildMood(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="readingTime"
              className="block text-sm font-medium text-gray-700"
            >
              Reading Time (minutes)
            </label>
            <input
              type="number"
              id="readingTime"
              value={readingTime}
              onChange={(e) => setReadingTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
        </div>
        <div className="w-1/2 ml-3 space-y-4">
          <div>
            <label
              htmlFor="characters"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Characters
            </label>
            <input
              type="number"
              id="characters"
              value={characters}
              onChange={(e) => setCharacters(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="childAge"
              className="block text-sm font-medium text-gray-700"
            >
              Child's Age
            </label>
            <input
              type="number"
              id="childAge"
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="moral" className="inline-flex items-center">
              <input
                type="checkbox"
                id="moral"
                checked={moral}
                onChange={(e) => setMoral(e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2">Include a moral lesson</span>
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Generate Stories
      </button>
    </form>
  );
};

export default StoryForm;
