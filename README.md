# CopilotKit <> Mastra Starter

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/71ee28678c984c4aa15b145bbe3e6f7b)](https://app.codacy.com/gh/ssdeanx/coagents-mastra/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

This is a starter template for building AI agents using [Mastra](https://mastra.ai) and [CopilotKit](https://copilotkit.ai). It provides a modern Next.js application with integrated AI capabilities and a beautiful UI.

## Prerequisites

- Node.js 18+
- Any of the following package managers:
  - pnpm (recommended)
  - npm
  - yarn
  - bun

> **Note:** This repository ignores lock files (package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lockb) to avoid conflicts between different package managers. Each developer should generate their own lock file using their preferred package manager. After that, make sure to delete it from the .gitignore.

## Getting Started

1. Add your OpenAI API key

  ```bash
  # you can use whatever model Mastra supports
  echo "GOOGLE_GENERATIVE_AI_API_KEY=your-key-here" >> .env
  ```

2. Install dependencies using your preferred package manager:

  ```bash
  # Using pnpm (recommended)
  pnpm install

  # Using npm
  npm install

  # Using yarn
  yarn install

  # Using bun
  bun install
  ```

2. Start the development server:

  ```bash
  # Using pnpm
  pnpm dev

  # Using npm
  npm run dev

  # Using yarn
  yarn dev

  # Using bun
  bun run dev
  ```

This will start both the UI and agent servers concurrently.

## Available Scripts

The following scripts can also be run using your preferred package manager:

- `dev` - Starts both UI and agent servers in development mode
- `dev:debug` - Starts development servers with debug logging enabled
- `dev:ui` - Starts only the UI server
- `dev:agent` - Starts only the Mastra agent server
- `build` - Builds the application for production
- `start` - Starts the production server
- `lint` - Runs ESLint for code linting

## Project Structure Diagram

```mermaid
graph TD

    15["Google Generative AI<br>External Service"]
    16["Langchain<br>Framework"]
    17["Pinecone DB<br>Vector Database"]
    18["Upstash DB<br>Redis / Database"]
    19["PostgreSQL DB<br>Relational Database"]
    20["Brave Search<br>External Service"]
    21["Arxiv Client<br>External Service"]
    22["Tavily Search<br>External Service"]
    4["User<br>External Actor"]
    subgraph 1["Mastra AI Core<br>TypeScript / Langchain"]
        10["AI Agents<br>TypeScript"]
        11["Agent Tools<br>TypeScript"]
        12["Agent Workflows<br>TypeScript"]
        13["Agent Memory<br>TypeScript"]
        14["Agent Configuration<br>TypeScript"]
        %% Edges at this level (grouped by source)
        12["Agent Workflows<br>TypeScript"] -->|orchestrates| 10["AI Agents<br>TypeScript"]
        14["Agent Configuration<br>TypeScript"] -->|provides config to| 10["AI Agents<br>TypeScript"]
        14["Agent Configuration<br>TypeScript"] -->|provides config to| 11["Agent Tools<br>TypeScript"]
        10["AI Agents<br>TypeScript"] -->|utilizes| 11["Agent Tools<br>TypeScript"]
        10["AI Agents<br>TypeScript"] -->|manages state with| 13["Agent Memory<br>TypeScript"]
    end
    subgraph 2["Backend API<br>Next.js API Routes"]
        9["CopilotKit API Route<br>TypeScript"]
    end
    subgraph 3["Web Application<br>Next.js / React"]
        5["Application Entry<br>TypeScript / React"]
        6["CopilotKit UI Components<br>TypeScript / React"]
        7["Research Canvas UI<br>TypeScript / React"]
        8["Model Selector Provider<br>TypeScript / React"]
        %% Edges at this level (grouped by source)
        5["Application Entry<br>TypeScript / React"] -->|renders| 6["CopilotKit UI Components<br>TypeScript / React"]
        5["Application Entry<br>TypeScript / React"] -->|renders| 7["Research Canvas UI<br>TypeScript / React"]
        7["Research Canvas UI<br>TypeScript / React"] -->|configures| 8["Model Selector Provider<br>TypeScript / React"]
    end
    %% Edges at this level (grouped by source)
    2["Backend API<br>Next.js API Routes"] -->|orchestrates AI tasks| 1["Mastra AI Core<br>TypeScript / Langchain"]
    3["Web Application<br>Next.js / React"] -->|makes requests to| 2["Backend API<br>Next.js API Routes"]
    4["User<br>External Actor"] -->|interacts with| 3["Web Application<br>Next.js / React"]
    11["Agent Tools<br>TypeScript"] -->|calls| 15["Google Generative AI<br>External Service"]
    11["Agent Tools<br>TypeScript"] -->|queries| 20["Brave Search<br>External Service"]
    11["Agent Tools<br>TypeScript"] -->|fetches data from| 21["Arxiv Client<br>External Service"]
    11["Agent Tools<br>TypeScript"] -->|queries| 22["Tavily Search<br>External Service"]
    1["Mastra AI Core<br>TypeScript / Langchain"] -->|integrates with| 16["Langchain<br>Framework"]
    13["Agent Memory<br>TypeScript"] -->|persists data to| 17["Pinecone DB<br>Vector Database"]
    13["Agent Memory<br>TypeScript"] -->|persists data to| 18["Upstash DB<br>Redis / Database"]
    13["Agent Memory<br>TypeScript"] -->|persists data to| 19["PostgreSQL DB<br>Relational Database"]

```

## Documentation

- [Mastra Documentation](https://mastra.ai/en/docs) - Learn more about Mastra and its features
- [CopilotKit Documentation](https://docs.copilotkit.ai) - Explore CopilotKit's capabilities
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
