# Kids Adventure Finder 🌟

A web application that helps you find kids-friendly favorite spots in any city using AI-powered recommendations.

## Features

- 🎨 Beautiful, kids-friendly UI with vibrant colors and animations
- 🤖 AI-powered spot recommendations using OpenAI API
- 📍 Customizable number of favorite spots (1-20)
- 📱 Fully responsive design
- ⚡ Fast and modern Next.js application

## Future Features

- 🗺️ Map view to choose the city
- 🔍 Enhanced search with filters and preferences

## Prerequisites

- Node.js (v18 or higher)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Setup

1. **Clone the repository and install dependencies:**

```bash
npm install
```

2. **Configure OpenAI API key:**

Create a `.env.local` file in the root directory:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

See [ENV_SETUP.md](ENV_SETUP.md) for detailed instructions.

3. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. Enter a city name (e.g., "New York", "Paris", "Tokyo")
2. Specify how many favorite spots you want to discover (1-20)
3. Click "Find Fun Spots!" to get AI-powered recommendations
4. Browse through kid-friendly locations with descriptions and reasons why they're great for ages 5-12

## Technology Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** OpenAI API with structured outputs
- **UI/UX:** Kids-friendly design with vibrant colors and animations

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
