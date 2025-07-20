# 🤖 CopilotKit <> Mastra AI Starter Template

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/71ee28678c984c4aa15b145bbe3e6f7b)](https://app.codacy.com/gh/ssdeanx/coagents-mastra/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![wakatime](https://wakatime.com/badge/user/7a2fb9a0-188b-4568-887f-7645f9249e62/project/9aecd309-f490-4566-8261-0652b1de5ae8.svg)](https://wakatime.com/badge/user/7a2fb9a0-188b-4568-887f-7645f9249e62/project/9aecd309-f490-4566-8261-0652b1de5ae8)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Upstash](https://img.shields.io/badge/Upstash-FF5722?style=for-the-badge&logo=upstash&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)

This repository provides a robust starter template for developing advanced AI applications by integrating [Mastra](https://mastra.ai), an open-source TypeScript agent framework, with [CopilotKit](https://copilotkit.ai), a powerful toolkit for building AI-powered user experiences. It features a modern Next.js application with a sleek UI, designed for seamless AI agent interaction and generative capabilities.

## ✨ Features

* **Intelligent AI Agents**: Leverage Mastra to build and manage sophisticated AI agents capable of complex reasoning, tool utilization, and memory management.
* **Seamless Frontend Integration**: Utilize CopilotKit's React hooks and components for intuitive AI interaction, including generative UI, chat interfaces, and dynamic content generation.
* **Modern Web Stack**: Built with Next.js, React, and TypeScript for a high-performance, scalable, and type-safe development experience.
* **Elegant User Interface**: Styled with Tailwind CSS and Shadcn UI components, ensuring a responsive, accessible, and visually appealing application.
* **Flexible Memory Management**: Configured with Upstash (Redis/Vector DB) for efficient and scalable agent memory, with support for Pinecone and PostgreSQL.
* **Comprehensive Tooling**: Agents are equipped with a wide array of tools for web search (Brave, Tavily), data analysis, academic research (Arxiv), and more.
* **Structured Project Architecture**: A clear and modular project structure facilitates easy development, maintenance, and extension.

## 🚀 Technologies

This project is built upon a modern and robust technology stack:

* **Framework**: [Next.js](https://nextjs.org/) (React Framework)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **AI Agent Framework**: [Mastra](https://mastra.ai/)
* **AI Frontend Toolkit**: [CopilotKit](https://copilotkit.ai/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (built on Radix UI)
* **Database/Memory**: [Upstash](https://upstash.com/) (Redis & Vector Database), [Pinecone](https://www.pinecone.io/) (Vector Database), [PostgreSQL](https://www.postgresql.org/) (Relational Database)
* **LLM Provider**: [Google Gemini](https://ai.google.dev/gemini)
* **AI Libraries**: [LangChain.js](https://js.langchain.com/docs/)
* **Code Quality**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
* **Deployment**: [Vercel](https://vercel.com/) (Recommended for Next.js applications)

## ⚙️ Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

* [Node.js](https://nodejs.org/) (version 18 or higher)
* One of the following package managers:
  * [pnpm](https://pnpm.io/) (recommended)
  * [npm](https://www.npmjs.com/)
  * [yarn](https://yarnpkg.com/)
  * [bun](https://bun.sh/)

> **Note:** This repository intentionally ignores lock files (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `bun.lockb`) to prevent conflicts between different package managers. Each developer should generate their own lock file using their preferred package manager. After initial setup, you may remove the corresponding lock file entry from `.gitignore` if desired.

### Environment Variables

Create a `.env` file in the root of the project and add your Google Generative AI API key:

```bash
# You can use any model supported by Mastra and Google Generative AI
GOOGLE_GENERATIVE_AI_API_KEY=your-key-here
```

### Installation

Install project dependencies using your preferred package manager:

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

### Running the Development Server

Start both the UI and agent servers concurrently:

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

The application will be accessible at `http://localhost:3000`.

## 🛠️ Available Scripts

The following scripts can be executed using your preferred package manager (e.g., `pnpm <script-name>`):

* `dev`: Starts both UI and agent servers in development mode.
* `dev:debug`: Starts development servers with debug logging enabled.
* `dev:ui`: Starts only the UI server.
* `dev:agent`: Starts only the Mastra agent server.
* `build`: Builds the application for production.
* `start`: Starts the production server.
* `lint`: Runs ESLint for code linting.

## 🗺️ Project Structure Diagram

```mermaid
graph TD

    23["User<br>External Actor"]
    subgraph 1["CopilotKit Integration System<br>CopilotKit"]
        120["Documentation<br>Markdown"]
        subgraph 2["Frontend Components<br>React"]
            114["Copilot Chat<br>React"]
            115["Copilot Popup<br>React"]
            116["Copilot Sidebar<br>React"]
            117["Frontend Actions<br>React"]
            118["Generative UI<br>React"]
            119["Human-in-the-Loop<br>React"]
        end
    end
    subgraph 3["Mastra Backend System<br>TypeScript/Node.js"]
        99["Tools<br>TypeScript"]
        subgraph 4["Configuration<br>TypeScript"]
            112["Google Provider<br>TypeScript"]
            113["Langchain Adapter<br>TypeScript"]
        end
        subgraph 5["Workflows<br>TypeScript"]
            107["Agent Performance Workflow<br>TypeScript"]
            108["Document Analysis Workflow<br>TypeScript"]
            109["Research Analysis Workflow<br>TypeScript"]
            110["Research Report Workflow<br>TypeScript"]
            111["Weather Workflow<br>TypeScript"]
        end
        subgraph 6["Networks<br>TypeScript"]
            105["Base Network<br>TypeScript"]
            106["VNext Workflow<br>TypeScript"]
        end
        subgraph 7["Memory<br>TypeScript"]
            100["PostgreSQL Memory<br>TypeScript"]
            101["Pinecone Memory<br>TypeScript"]
            102["Processor Extra<br>TypeScript"]
            103["Memory Store<br>TypeScript"]
            104["Upstash Memory<br>TypeScript"]
        end
        subgraph 8["Agents<br>TypeScript"]
            91["Analyzer Agent<br>TypeScript"]
            92["Chance Agent<br>TypeScript"]
            93["Generation Agent<br>TypeScript"]
            94["LangGraph Agent<br>TypeScript"]
            95["Master Agent<br>TypeScript"]
            96["Research Agent<br>TypeScript"]
            97["Supervisor Agent<br>TypeScript"]
            98["Weather Agent<br>TypeScript"]
        end
        %% Edges at this level (grouped by source)
        6["Networks<br>TypeScript"] -->|Defines communication for| 5["Workflows<br>TypeScript"]
        6["Networks<br>TypeScript"] -->|Defines communication for| 8["Agents<br>TypeScript"]
        8["Agents<br>TypeScript"] -->|Accesses| 7["Memory<br>TypeScript"]
        8["Agents<br>TypeScript"] -->|Utilizes| 99["Tools<br>TypeScript"]
        5["Workflows<br>TypeScript"] -->|Orchestrates| 8["Agents<br>TypeScript"]
    end
    subgraph 9["Frontend System<br>Next.js"]
        90["CopilotKit API Route<br>Next.js API"]
        subgraph 10["Frontend Utilities and Hooks<br>TypeScript/React"]
            83["Mobile Hook<br>TypeScript"]
            84["Dashboard Types<br>TypeScript"]
            85["Model Selector Provider<br>React"]
            86["Resource Utilities<br>TypeScript"]
            87["Telemetry Service<br>TypeScript"]
            88["General Types<br>TypeScript"]
            89["General Utilities<br>TypeScript"]
        end
        subgraph 11["UI Components<br>React"]
            60["Research Workspace<br>React"]
            subgraph 12["UI Library Components<br>React/Shadcn UI"]
                70["Button<br>React"]
                71["Input<br>React"]
                72["Dialog<br>React"]
                73["Form<br>React"]
                74["Table<br>React"]
                75["Accordion<br>React"]
                76["Alert Dialog<br>React"]
                77["Carousel<br>React"]
                78["Chart<br>React"]
                79["Dropdown Menu<br>React"]
                80["Select<br>React"]
                81["Tabs<br>React"]
                82["Textarea<br>React"]
            end
            subgraph 13["Workflow Components<br>React"]
                64["Workflow Canvas<br>React"]
                subgraph 14["Workflow Nodes<br>React"]
                    65["Agent Node<br>React"]
                    66["Condition Node<br>React"]
                    67["Start Node<br>React"]
                    68["End Node<br>React"]
                    69["Tool Node<br>React"]
                end
            end
            subgraph 15["Research Canvas Components<br>React"]
                61["Research Canvas<br>React"]
                62["Resources Display<br>React"]
                63["Model Selector<br>React"]
            end
            subgraph 16["Landing Page Components<br>React"]
                57["Hero Section<br>React"]
                58["Features Section<br>React"]
                59["Call to Action<br>React"]
            end
            subgraph 17["Development Components<br>React"]
                53["Code Editor<br>React"]
                54["Component Generator<br>React"]
                55["Dev Workspace<br>React"]
                56["File Manager<br>React"]
            end
            subgraph 18["Analytics Components<br>React"]
                46["Metrics Card<br>React"]
                47["Performance Chart<br>React"]
                48["Telemetry Data Hook<br>React"]
                49["Data Processing Utils<br>TypeScript"]
                50["Agent Performance Widget<br>React"]
                51["System Health Widget<br>React"]
                52["Tool Usage Widget<br>React"]
            end
            subgraph 19["Agent Components<br>React"]
                44["Agent Config Interface<br>React"]
                45["Agent Health Dashboard<br>React"]
            end
            subgraph 20["Layout Components<br>React"]
                39["Page Layout<br>React"]
                40["Sidebar<br>React"]
                41["Top Navbar<br>React"]
                42["Footer<br>React"]
                43["Theme Provider<br>React"]
            end
        end
        subgraph 21["Application Pages<br>Next.js"]
            24["Root Page<br>Next.js"]
            25["About Page<br>Next.js"]
            26["Agents Page<br>Next.js"]
            27["Analytics Page<br>Next.js"]
            28["Dashboard Page<br>Next.js"]
            29["Development Page<br>Next.js"]
            37["Research Page<br>Next.js"]
            38["Workflows Page<br>Next.js"]
            subgraph 22["Documentation Pages<br>Next.js"]
                30["Agents Docs<br>Next.js"]
                31["Chat Docs<br>Next.js"]
                32["Memory Docs<br>Next.js"]
                33["Networks Docs<br>Next.js"]
                34["Settings Docs<br>Next.js"]
                35["Tools Docs<br>Next.js"]
                36["Workflows Docs<br>Next.js"]
            end
        end
        %% Edges at this level (grouped by source)
        9["Frontend System<br>Next.js"] -->|Communicates via| 90["CopilotKit API Route<br>Next.js API"]
    end
    %% Edges at this level (grouped by source)
    90["CopilotKit API Route<br>Next.js API"] -->|Proxies requests to| 3["Mastra Backend System<br>TypeScript/Node.js"]
    23["User<br>External Actor"] -->|Interacts with| 9["Frontend System<br>Next.js"]
    2["Frontend Components<br>React"] -->|Uses| 90["CopilotKit API Route<br>Next.js API"]

```

## 📚 Documentation

* [Mastra Documentation](https://mastra.ai/en/docs) - Learn more about Mastra and its features.
* [CopilotKit Documentation](https://docs.copilotkit.ai) - Explore CopilotKit's capabilities.
* [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) (if applicable, otherwise remove this line) for more details on how to get started, report issues, and submit pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
