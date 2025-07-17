import { NextRequest } from "next/server";
import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { MastraAgent } from "@ag-ui/mastra";
import { MastraClient } from "@mastra/client-js";
import type { AbstractAgent } from "@ag-ui/client";

 // 1. Base address for the Mastra server
const MASTRA_URL = process.env.MASTRA_URL || "http://localhost:4111";

// Common init logic moved to top‐level
async function initRuntime() {
  const client = new MastraClient({ baseUrl: MASTRA_URL });
  const serviceAdapter = new ExperimentalEmptyAdapter();
  const remoteAgents = await MastraAgent.getRemoteAgents({ mastraClient: client });
  const runtime = new CopilotRuntime({
    agents: remoteAgents as unknown as Record<string, AbstractAgent>,
  });

  // Optional: fetch telemetry/logs for debugging
  const telemetry = await client.getTelemetry({ name: "trace-name", scope: "scope-name", page: 1, perPage: 10, attribute: { key: "value" } });
  console.log("Fetched telemetry:", telemetry);
  const logs = await client.getLogs({ transportId: "transport-1" });
  console.log("Fetched logs:", logs);

  return copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });
}

export async function POST(req: NextRequest) {
  const { handleRequest } = await initRuntime();
  return handleRequest(req);
}
// If you also need GET support, simply forward to POST
export async function GET(req: NextRequest) {
  const { handleRequest } = await initRuntime();
  return handleRequest(req);
}
// Configuration for Next.js Edge Runtime
export const config = {
  runtime: "edge",
};
