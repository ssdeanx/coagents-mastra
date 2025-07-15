import { Mastra } from "@mastra/core/mastra";
import { weatherAgent, researchAgent, supervisorAgent, analyzerAgent, masterAgent, generationAgent, chanceAgent, langGraphAgent } from "./agents/index";
import { createLogger, LogLevel } from "@mastra/core/logger";
import { weatherWorkflow, researchAnalysisWorkflow, documentAnalysisWorkflow, researchReportWorkflow, agentPerformanceWorkflow } from "./workflows/index";
import { baseNetwork } from "./networks/base-network";
import { vNextNetwork } from "./workflows/vnext-workflow";
import { LangfuseExporter } from 'langfuse-vercel';
//import { registerCopilotKit } from "@ag-ui/mastra";
//import { CopilotRuntime, copilotRuntimeNodeHttpEndpoint, ExperimentalEmptyAdapter } from "@copilotkit/runtime";
// Runtime context types for agents
//import { AnalyzerAgentRuntimeContext, ChanceAgentRuntimeContext, GenerationAgentRuntimeContext, MasterAgentRuntimeContext, ResearchAgentRuntimeContext, SupervisorAgentRuntimeContext } from "./agents/index";

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
    langGraphAgent,
  },
  workflows: {
    weatherWorkflow,
    researchAnalysisWorkflow,
    documentAnalysisWorkflow,
    researchReportWorkflow,
    agentPerformanceWorkflow,
  },
  vnext_networks: { 'dean-machines-vnext': vNextNetwork },
  networks: {
    baseNetwork
  },
  logger: createLogger({
    level: LOG_LEVEL,
  }),
  telemetry: {
        serviceName: "ai",
        enabled: true,
        sampling: {
            type: "always_on",
        },
        export: {
            type: "custom",
            tracerName: "mastra",
            exporter: new LangfuseExporter({
                publicKey: process.env.LANGFUSE_PUBLIC_KEY,
                secretKey: process.env.LANGFUSE_SECRET_KEY,
                baseUrl: process.env.LANGFUSE_HOST,
        })},
  },
  server: {
    // Disable CORS for development
    cors: ENV === "development" ? {
      origin: "*",
      allowMethods: ["*"],
      allowHeaders: ["*"],
    } : undefined,
  },
});