# Mastra Project Overview

This document provides a consolidated overview of the Mastra implementation within this project, combining details from the local codebase with relevant information from the official Mastra documentation. It serves as a central reference for understanding the project's AI agent, memory, and tool configurations.

## 1. Mastra Core Concepts (from Mastra Documentation)

Mastra is an open-source TypeScript agent framework designed to build AI applications and features. It provides primitives for:

* **Model routing**: Uses the Vercel AI SDK for a unified interface to interact with LLM providers (OpenAI, Anthropic, Google Gemini).
* **Agent memory and tool calling**: Agents can have memory and execute functions (tools). Memory can be persisted and retrieved based on recency, semantic similarity, or conversation thread.
* **Workflow graphs**: A graph-based engine for deterministic LLM call execution, supporting control flow (`.then()`, `.branch()`, `.parallel()`).
* **Agent development environment**: A local environment for chatting with agents and observing their state and memory.
* **Retrieval-augmented generation (RAG)**: APIs to process documents into chunks, create embeddings, and store them in vector databases. Supports unified API over multiple vector stores (Pinecone, pgvector, Upstash) and embedding providers.
* **Deployment**: Supports bundling agents and workflows within existing React, Next.js, or Node.js applications, or into standalone endpoints.
* **Evals**: Automated evaluation metrics for LLM outputs (model-graded, rule-based, statistical methods).

## 2. Current Mastra Implementation Details

### 2.1. Memory Configurations

#### 2.1.1. Primary Memory: `src/mastra/memory/upstashMemory.ts`

This file defines the primary `mastraMemory` instance, leveraging Upstash for both Redis-based storage and vector search capabilities. It is the main memory implementation currently in use.

* **Storage**: `UpstashStore` for distributed Redis storage.
* **Vector Store**: `UpstashVector` for semantic search, configured with Gemini embeddings (768-dimension, cosine similarity).
* **Embedder**: `createGeminiEmbeddingModel()` from `../config/googleProvider`.
* **Memory Processors**: A comprehensive set of processors are applied to `mastraMemory` to enhance context retention, mitigate biases, and track tool usage. These processors are defined in `src/mastra/memory/processor-extra.ts`:
  * `AttentionGuidedMemoryProcessor`: Manages message importance and context preservation.
  * `ContextualRelevanceProcessor`: Handles topic continuity and shifts.
  * `TokenLimiter`: Enforces a 1M token limit for context.
  * `ToolCallFilter`: Includes all tool calls for better context.
  * `WorkflowAwareMemoryProcessor`: Integrates with defined workflow stages (`data_collection`, `analysis`, `reporting`) for context retention.
  * `BiasMitigationProcessor`: Detects and mitigates various cognitive biases (confirmation, recency, anchoring, framing, etc.).
  * `MentalModelProcessor`: (No specific configuration shown, likely default behavior).
  * `ToolUsageTrackerProcessor`: Logs tool usage at a specified interval.
  * `AgentInteractionPatternProcessor`: Analyzes interaction patterns over a sequence length.
* **Key Functions**:
  * `createMemoryThread`: Creates new memory threads.
  * `getMemoryThreadMessages`: Retrieves messages for a given thread.
  * `getMemoryThreadById`: Retrieves a thread by its ID.
  * `getMemoryThreadsByResourceId`: Retrieves threads by resource ID.
  * `searchMemoryMessages`: Performs semantic search within a thread, supporting metadata filtering.
  * `getMemoryUIThreadMessages`: Retrieves UI-formatted messages.
  * `maskMemoryWorkingMemoryStream`: Masks internal working memory updates from text streams.
  * `enhancedMemorySearchMessages`: Provides enhanced search with performance tracking.
  * `createVectorIndex`, `listVectorIndexes`, `describeVectorIndex`, `deleteVectorIndex`: Manage Upstash vector indexes.
  * `upsertVectors`, `queryVectors`, `updateVector`, `deleteVector`, `batchUpsertVectors`: Perform vector operations.
  * `enhancedVectorSearch`: Advanced vector search with semantic filtering and ranking.
  * `batchCreateMemoryThreads`: Efficiently creates multiple threads.
  * `optimizeMemoryStorage`: Placeholder for memory cleanup (Upstash auto-managed).
  * `validateMetadataFilter`, `transformToUpstashFilter`: Utility functions for handling metadata filters compatible with Upstash.
  * `extractChunkMetadata`: Extracts metadata from document chunks using LLM analysis.
  * `saveWorkflow`, `getWorkflow`, `getWorkflowRuns`: Manages workflow state persistence.
  * `saveTrace`, `getTraces`: Manages trace data persistence.
  * `saveEval`, `getEvals`: Manages evaluation data persistence.

#### 2.1.2. Memory Processors: `src/mastra/memory/processor-extra.ts`

This file contains the implementations of various custom memory processors used by `upstashMemory.ts` to enhance memory management and agent behavior.

* **`ExtendedMemoryProcessor`**: A base class for custom memory processors.
* **`BiasMitigationProcessor`**: Detects and mitigates cognitive biases in messages.
* **`AttentionGuidedMemoryProcessor`**: Implements attention-based relevance scoring, dynamic context pruning, and semantic importance weighting.
* **`ContextualRelevanceProcessor`**: Focuses on maintaining contextually relevant messages based on topic continuity.
* **`WorkflowAwareMemoryProcessor`**: Dynamically adjusts context based on the current workflow stage.
* **`ToolUsageTrackerProcessor`**: Monitors and logs tool usage by agents for analytics.
* **`AgentInteractionPatternProcessor`**: Analyzes sequences of agent interactions to identify patterns.
* **`MentalModelProcessor`**: Identifies patterns in chat messages to suggest applicable mental models.

#### 2.1.3. Other Memory Implementations (Not Currently in Use)

* **`src/mastra/memory/pinecone.ts`**: Configures a `PineconeVector` instance for vector storage and search. While present, this is not the primary memory in use.
* **`src/mastra/memory/pg.ts`**: Sets up a `Memory` instance using PostgreSQL for storage and vector capabilities. This is also not the primary memory in use.

### 2.2. Agent Definitions

The `src/mastra/agents/` directory contains definitions for several specialized agents.

#### 2.2.1. `src/mastra/agents/index.ts`

This file serves as a barrel file, exporting all defined agents for easier import elsewhere in the project. It does not contain direct agent implementation logic.

#### 2.2.2. Individual Agent Implementations

* **`src/mastra/agents/weather-agent.ts`**
  * **Description**: Defines the `weatherAgent`, an agent specialized in providing weather information.
  * **Model Provider**: Uses `createGemini25Provider('gemini-2.5-flash-lite-preview-06-17')` for its LLM.
  * **Memory**: Configured to use `mastraMemory` (from `upstashMemory.ts`).
  * **Tools**: Includes `weatherTool`.
  * **Configuration**: `thinkingBudget` is 0 (disabled), `includeThoughts` is false, `safetyLevel` is 'OFF', and `structuredOutputs` are enabled.

* **`src/mastra/agents/analyzer-agent.ts`**
  * **Description**: A comprehensive data agent for analysis, processing, and insights generation, specializing in data manipulation, statistical analysis, and visualization.
  * **Model Provider**: Uses `createGemini25Provider('gemini-2.5-flash-lite-preview-06-17')`.
  * **Memory**: Configured to use `mastraMemory`.
  * **Tools**: Includes a wide range of tools for data acquisition, web search, code analysis, financial data, and cognitive frameworks.
  * **Runtime Context**: Supports `AnalyzerAgentRuntimeContext` for analysis preferences, data processing, and insight generation settings.

* **`src/mastra/agents/chance-agent.ts`**
  * **Description**: Specializes in decision-making under uncertainty, balancing exploration and exploitation. Designed to assess probabilities, manage risk, and adapt strategies based on outcomes.
  * **Model Provider**: Uses `createGemini25Provider('gemini-2.5-flash-lite-preview-06-17')`.
  * **Memory**: Configured to use `mastraMemory`.
  * **Tools**: Includes tools for information retrieval, web research, data management, and stochastic algorithms.
  * **Runtime Context**: Supports `ChanceAgentRuntimeContext` for preferences in decision-making under uncertainty.

* **`src/mastra/agents/generation-agent.ts`**
  * **Description**: Specializes in creating diverse content based on prompts and context, including text, code, image/audio/video prompts, structured data, reports, and summaries.
  * **Model Provider**: Uses `createGemini25Provider('gemini-2.5-flash-lite-preview-06-17')`.
  * **Memory**: Configured to use `mastrMemory`.
  * **Tools**: Includes tools for information retrieval, web scraping, data management, and various cognitive frameworks.
  * **Runtime Context**: Supports `GenerationAgentRuntimeContext` for content generation preferences, style, and output format.

* **`src/mastra/agents/master-agent.ts`**
  * **Description**: The primary debugging and problem-solving assistant, capable of handling complex tasks across various domains by leveraging a comprehensive suite of specialized tools.
  * **Model Provider**: Uses `createGemini25Provider('gemini-2.5-flash-lite-preview-06-17')`.
  * **Memory**: Configured to use `mastraMemory`.
  * **Tools**: Includes tools for graph-based knowledge retrieval, vector search, file system operations, Git management, real-time data, and more.
  * **Runtime Context**: Supports `MasterAgentRuntimeContext` for production-focused runtime variables and behavior.

* **`src/mastra/agents/research-agent.ts`**
  * **Description**: A highly specialized research agent adept at comprehensive information gathering, rigorous fact-checking, and insightful knowledge synthesis.
  * **Model Provider**: Uses `createGemini25Provider('gemini-2.5-flash-lite-preview-06-17')`.
  * **Memory**: Configured to use `mastraMemory`.
  * **Tools**: Includes tools for web search, academic research, code analysis, and data management.
  * **Runtime Context**: Supports `ResearchAgentRuntimeContext` for research preferences and source filtering.

* **`src/mastra/agents/supervisor-agent.ts`**
  * **Description**: Responsible for orchestrating, coordinating, and ensuring the optimal performance of a team of AI agents. Specializes in task delegation, quality assurance, and performance monitoring.
  * **Model Provider**: Uses `createGemini25Provider('gemini-2.5-flash-lite-preview-06-17')`.
  * **Memory**: Configured to use `mastraMemory`.
  * **Tools**: Includes tools for vector search, chunking, graph RAG, web search, and data management.
  * **Runtime Context**: Supports `SupervisorAgentRuntimeContext` for agent coordination preferences, delegation rules, and oversight configurations.

### 2.3. Tool Implementations

#### 2.3.1. `src/mastra/tools/index.ts`

This is the main barrel file for all Mastra tools, providing a centralized registry (`toolsRegistry`) for dynamic lookup and execution. It categorizes and exports tools from various modules.

* **Categories**: Data File Management, Web Search, Social Media & News, Academic & Research, Code Analysis & Scraping, Diffbot Integration, Financial Data, Sports, Vector & RAG, Weather, Cognitive Frameworks, Miscellaneous, and Runtime Context Types.
* **Key Exports**: Includes tools like `readDataFileTool`, `createBraveSearchTool`, `createTavilySearchTool`, `wikidataTools`, `createRedditClient`, `createHackerNewsClient`, `createArxivClient`, `codeSearchTool`, `webScraperTool`, `gitOperationsTool`, `diffbotAnalyzeUrlTool`, `cryptoPriceTool`, `stockPriceTool`, `sportsOddsTool`, `vectorQueryTool`, `chunkerTool`, `graphRAGUpsertTool`, `weatherTool`, `structuredArgumentationTool`, `sequentialThinkingTool`, `mentalModelTool`, `debuggingApproachTool`, `collaborativeReasoningTool`, `decisionFrameworkTool`, `metacognitiveMonitoringTool`, `scientificMethodTool`, `visualReasoningTool`, `stochasticAlgorithmTool`, `getNango`, `mem0RememberTool`, `rerankTool`, and `createFreestyleTool`.

#### 2.3.2. `src/mastra/tools/chunker-tool.ts`

This tool provides advanced document chunking capabilities.

* **Input Schema**: `chunkerInputSchema` defines parameters for document content, type, chunking strategy (`recursive`, `sentence`, `paragraph`, `fixed`, `semantic`), size, overlap, metadata extraction (`extractParams`), and vector integration options (`vectorOptions`).
* **Output Schema**: `chunkerOutputSchema` provides detailed information about the chunks, statistics, and vector processing.
* **Integration**: Uses `upsertVectors` and `extractChunkMetadata` from `../memory/upstashMemory` for vector storage and metadata enrichment.
* **Embedder**: Uses `createGeminiEmbeddingModel()` for creating embeddings.
* **Runtime Context**: `ChunkerToolRuntimeContext` allows dynamic configuration of chunking parameters.
* **Preprocessing**: Includes functions for preprocessing LaTeX, CSV, and XML content.

#### 2.3.3. `src/mastra/tools/vectorQueryTool.ts`

This module offers various tools for querying vector stores.

* **`vectorQueryTool`**: A basic vector query tool using `@mastra/rag`'s `createVectorQueryTool`, configured for "upstashVector" and "training" index with Gemini embeddings.
* **`enhancedVectorQueryTool`**: An advanced tool that integrates with `searchMemoryMessages` from `upstashMemory.ts` for context-aware search within threads. It also performs direct vector store searches using Gemini embeddings.
* **`hybridVectorSearchTool`**: Combines semantic search with metadata filtering. It uses `enhancedVectorQueryTool` for semantic search and applies a weighted combination of semantic and metadata scores for ranking.
* **Runtime Context**: `VectorQueryRuntimeContext` enables dynamic configuration of search preferences, language, and quality thresholds via runtime context.

## 2.4. Google Provider Configuration

### 2.4.1. `src/mastra/config/googleProvider.ts`

This file provides an enhanced Google Generative AI Provider setup for Mastra, focusing on Gemini 2.5 series models and supporting advanced features.

* **Gemini Model Configuration**: Defines constants for various Gemini 2.5 models (Flash Lite, Pro, Flash) and embedding models (`TEXT_EMBEDDING_004`).
* **Safety Settings**: Includes presets for different safety levels (STRICT, MODERATE, PERMISSIVE, OFF) for content moderation.
* **`baseGoogleModel` Function**: An enhanced base function for creating Google model instances, supporting:
  * `useSearchGrounding`: Integration with Google Search.
  * `dynamicRetrieval`: Dynamic search grounding based on model's decision.
  * `safetyLevel`: Configurable safety settings.
  * `cachedContent`: Explicit caching for cost optimization.
  * `structuredOutputs`: Enables structured JSON responses.
  * Langfuse tracing options for observability.
* **`createGemini25Provider` Function**: A wrapper around `baseGoogleModel` for creating Gemini 2.5+ providers, maintaining backward compatibility for `thinkingConfig` and `responseModalities`.
* **`createGeminiImageProvider` Function**: Configures Google provider for image generation capabilities.
* **`createGeminiEmbeddingModel` Function**: Creates embedding models with flexible dimensions (defaults to 768 for `TEXT_EMBEDDING_004`) and task types.
* **Caching Utilities**:
  * `createCacheManager`: Creates an explicit cache manager.
  * `createCachedContent`: Creates cached content for models.
  * `createCachedGoogleModel`: An asynchronous function to create a Google model instance with explicit caching support.
  * `supportsExplicitCaching`: Utility to check if a model supports caching.
* **Search Grounding Utilities**:
  * `extractGroundingMetadata`: Extracts search grounding metadata from provider responses.
  * `logCacheUsage`: Logs cache usage statistics.
  * `searchGroundedGeneration`: Utility for enhanced search grounded generation.

## 3. Key Takeaways and Next Steps

* **Memory Flexibility**: The project demonstrates strong flexibility in memory management, with `upstashMemory.ts` and `processor-extra.ts` being the primary active implementations.
* **Comprehensive Tooling**: A wide array of tools are available and well-organized, covering various domains from data management to cognitive frameworks. The `toolsRegistry` provides a robust mechanism for tool discovery and execution.
* **RAG Capabilities**: The `chunkerTool` and `vectorQueryTool` implementations highlight robust RAG capabilities, including document chunking, metadata extraction, embedding generation, and advanced vector search.
* **Agent Structure**: The `weatherAgent` serves as a clear example of how agents are defined, integrating LLM providers, memory, and tools.
* **Advanced Google Integration**: The `googleProvider.ts` file showcases a sophisticated integration with Google's Gemini models, including fine-grained control over safety, caching, and search grounding.

**Potential Next Steps:**

* **Refine Memory Processors**: Review the configuration of memory processors in `upstashMemory.ts` and `processor-extra.ts` to ensure they are optimally tuned for specific use cases and performance requirements.
* **Expand Agent Implementations**: Develop more agents leveraging the existing memory and tool infrastructure for different functionalities.
* **Implement Workflows**: Explore and implement Mastra workflows to orchestrate complex, multi-step agent interactions or LLM call sequences.
* **Deep Dive into Evals**: Utilize Mastra's evaluation capabilities to systematically assess agent performance and improve model outputs.
* **Optimize Vector Indexes**: Monitor and optimize the performance of vector indexes in Upstash, considering factors like dimension, metric, and data distribution.
