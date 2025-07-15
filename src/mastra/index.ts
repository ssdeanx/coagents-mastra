import { Mastra } from "@mastra/core/mastra";
import { weatherAgent, researchAgent, supervisorAgent, analyzerAgent, masterAgent, generationAgent, chanceAgent } from "./agents/index";
import { createLogger, LogLevel } from "@mastra/core/logger";
import { weatherWorkflow } from "./workflows/weather-workflow";
import { baseNetwork } from "./networks/base-network";
//import { registerCopilotKit } from "@ag-ui/mastra";
//import { CopilotRuntime, copilotRuntimeNodeHttpEndpoint, ExperimentalEmptyAdapter } from "@copilotkit/runtime";

const LOG_LEVEL = process.env.LOG_LEVEL as LogLevel || "info";
const ENV = process.env.NODE_ENV || "development";

export const mastra = new Mastra({
  agents: {
    weatherAgent,
    researchAgent,
    supervisorAgent,
    analyzerAgent,
    masterAgent,
    generationAgent,
    chanceAgent,
  },
  workflows: {
    weatherWorkflow,
  },
  networks: {
    baseNetwork,
  },
  logger: createLogger({
    level: LOG_LEVEL,
  }),
  server: {
    // Disable CORS for development
    cors: ENV === "development" ? {
      origin: "*",
      allowMethods: ["*"],
      allowHeaders: ["*"],
    } : undefined,
  },
});