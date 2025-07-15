/**
 * CopilotKit Reusable Components
 * 
 * This module exports all the reusable CopilotKit components for easy import
 * throughout the application.
 */

export { CopilotChatComponent } from "./copilot-chat";
export { CopilotSidebarComponent } from "./copilot-sidebar";
export { CopilotPopupComponent } from "./copilot-popup";
export { GenerativeUI, useGenerativeUIAction } from "./generative-ui";
export { HumanInTheLoop } from "./human-in-the-loop";
export { FrontendActions, useFrontendAction } from "./frontend-actions";

// Re-export commonly used CopilotKit types and utilities
export type { CopilotKitCSSProperties } from "@copilotkit/react-ui";
export type { CatchAllActionRenderProps } from "@copilotkit/react-core";
