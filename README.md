# Bedtime Buddy: AI-powered storybook generator

Bedtime Buddy is an application that generates personalized bedtime stories for children.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/)
* You have a Windows/Linux/Mac machine.

## Installing Bedtime Buddy

To run Bedtime Buddy, follow these steps:

1. Clone the repository
   
   git clone

2. Navigate to the project directory
   
   cd bedtime-buddy

3. Install the dependencies for both the client and server
   
   cd packages/client && npm install cd ../server && npm install

4. In the `packages/server` directory, create a `.env` file with the following content:
   
   OPENAI_API_KEY=[your_openai_api_key_here]

5. Start the backend server

   cd packages/server npm run dev

   The server will start running on `http://localhost:3001`.

6. In a new terminal, start the frontend development server

   cd packages/client npm run dev

   The application will open in your default web browser at `http://localhost:5173`.


## Using Bedtime Buddy

1. Fill out the form with the desired story parameters.
2. Click "Generate Stories" to create four unique bedtime stories.
3. Click on a story cover to expand and read the full story.
