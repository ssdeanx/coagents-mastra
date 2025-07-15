import { createGemini25Provider } from '../config/googleProvider';
import { Agent } from "@mastra/core/agent";
import { weatherTool } from "@/mastra/tools";
import { mastraMemory } from "../memory/upstashMemory";
import { weatherWorkflow } from "../workflows/weather-workflow";

export const weatherAgent = new Agent({
  name: "Weather Agent",
  description: "Agent for weather information",
  instructions: `
      You are a helpful assistant.
  `,
  memory: mastraMemory,
  model: createGemini25Provider('gemini-2.5-flash-lite-preview-06-17', {
    // Response modalities - what types of content the model can generate
    responseModalities: ["TEXT"], // Can also include "IMAGE" for image generation
    // Thinking configuration for enhanced reasoning
    thinkingConfig: {
      thinkingBudget: 0, // -1 = dynamic budget, 0 = disabled, 1-24576 = fixed budget 512 = min
      includeThoughts: false, // Include reasoning process in response for debugging
    },
    // Search grounding for real-time information access
    //useSearchGrounding: true, // Enable Google Search integration for current events
    // Dynamic retrieval configuration
    //dynamicRetrieval: true, // Let model decide when to use search grounding
    // Safety settings level
    safetyLevel: 'OFF', // Options: 'STRICT', 'MODERATE', 'PERMISSIVE', 'OFF'
    // Structured outputs for better tool integration
    structuredOutputs: true, // Enable structured JSON responses
    // Cached content for cost optimization (if you have cached content)
    // cachedContent: 'your-cache-id', // Uncomment if using explicit caching
    // Langfuse tracing configuration
  }),
  tools: { weatherTool },
  workflows: { weatherWorkflow }
});
