import { Mastra } from "@mastra/core/mastra";
import { weatherAgent } from "./agents";
import { createLogger, LogLevel } from "@mastra/core/logger";
//import { registerCopilotKit } from "@ag-ui/mastra";
//import { CopilotRuntime, copilotRuntimeNodeHttpEndpoint, ExperimentalEmptyAdapter } from "@copilotkit/runtime";

const LOG_LEVEL = process.env.LOG_LEVEL as LogLevel || "info";
const ENV = process.env.NODE_ENV || "development";

export const mastra = new Mastra({
  agents: {
    weatherAgent
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