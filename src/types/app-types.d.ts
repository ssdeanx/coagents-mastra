/**
 * @module AppTypes
 * @author Cline
 * @date 2025-07-17
 * @version 1.0.0
 * @remarks This file contains core types and interfaces for the CopilotKit Integration System,
 *          as defined in the project's design and requirements documents.
 *          These types are central to structuring the application's pages, navigation,
 *          and CopilotKit component configurations.
 */

import React from 'react';
import { CopilotKitCSSProperties } from '@copilotkit/react-ui';

/**
 * @interface CopilotKitProviderProps
 * @description Props for the core CopilotKitProvider component.
 * @property {React.ReactNode} children - The child components to be rendered within the provider.
 * @property {string} [runtimeUrl] - The URL for the Copilot Runtime instance.
 * @property {string} [publicApiKey] - Your Copilot Cloud API key.
 * @property {string} [instructions] - Custom instructions to be added to the system message.
 * @example
 * ```typescript
 * <CopilotKitProvider runtimeUrl="/api/copilotkit">
 *   <App />
 * </CopilotKitProvider>
 * ```
 */
export interface CopilotKitProviderProps {
  children: React.ReactNode;
  runtimeUrl?: string;
  publicApiKey?: string;
  instructions?: string;
}

/**
 * @interface CopilotLabels
 * @description Defines custom labels for CopilotKit chat components.
 * @property {string} [title] - Title for the chat window.
 * @property {string} [initial] - Initial message displayed in the chat.
 * @property {string} [placeholder] - Placeholder text for the input field.
 * @property {string} [stopGenerating] - Label for the stop generation button.
 * @property {string} [regenerateResponse] - Label for the regenerate response button.
 * @example
 * ```typescript
 * const labels: CopilotLabels = {
 *   title: "AI Assistant",
 *   initial: "Hello! How can I help you today?",
 * };
 * ```
 */
export interface CopilotLabels {
  title?: string;
  initial?: string;
  placeholder?: string;
  stopGenerating?: string;
  regenerateResponse?: string;
  // Add other labels as needed based on CopilotKit documentation
}

/**
 * @interface PageConfig
 * @description Configuration for individual application pages, including CopilotKit settings.
 * @property {string} title - The title of the page.
 * @property {string} description - A brief description of the page's content or purpose.
 * @property {object} copilotConfig - Configuration specific to the CopilotKit component on this page.
 * @property {'chat' | 'sidebar' | 'popup'} copilotConfig.component - The type of CopilotKit UI component to use.
 * @property {boolean} [copilotConfig.defaultOpen] - Whether the CopilotKit component should be open by default.
 * @property {string} [copilotConfig.instructions] - Specific instructions for the AI agent on this page.
 * @property {CopilotLabels} [copilotConfig.labels] - Custom labels for the CopilotKit component.
 * @property {string[]} [copilotConfig.features] - List of features enabled for the CopilotKit component on this page.
 * @example
 * ```typescript
 * const dashboardPageConfig: PageConfig = {
 *   title: "AI Dashboard",
 *   description: "Interact with Mastra AI agents.",
 *   copilotConfig: {
 *     component: 'sidebar',
 *     defaultOpen: true,
 *     instructions: "You are an assistant for the AI dashboard.",
 *   },
 * };
 * ```
 */
export interface PageConfig {
  title: string;
  description: string;
  copilotConfig: {
    component: 'chat' | 'sidebar' | 'popup';
    defaultOpen?: boolean;
    instructions?: string;
    labels?: CopilotLabels;
    features?: string[];
  };
}

/**
 * @interface CopilotWrapperProps
 * @description Props for a wrapper component that configures a CopilotKit UI component.
 * @property {PageConfig['copilotConfig']} config - The CopilotKit configuration for the component.
 * @property {string} [themeColor] - Optional theme color to apply to the component.
 * @property {string} [className] - Optional CSS class name for styling.
 * @property {React.ReactNode} [children] - The child components to be rendered within the wrapper.
 * @example
 * ```typescript
 * <CopilotWrapper config={pageConfig.copilotConfig} themeColor="blue">
 *   <SomeContent />
 * </CopilotWrapper>
 * ```
 */
export interface CopilotWrapperProps {
  config: PageConfig['copilotConfig'];
  themeColor?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * @interface ActionParameter
 * @description Defines a parameter for a custom AI action.
 * @property {string} name - The name of the parameter.
 * @property {'string' | 'number' | 'boolean' | 'object' | 'object[]' | 'string[]' | 'number[]' | 'boolean[]'} type - The data type of the parameter.
 * @property {string} [description] - A description of the parameter's purpose.
 * @property {string[]} [enum] - For string parameters, an array of possible values.
 * @property {boolean} [required] - Whether the parameter is required. Defaults to true.
 * @property {ActionParameter[]} [attributes] - If type is 'object' or 'object[]', defines nested parameters.
 * @example
 * ```typescript
 * const param: ActionParameter = {
 *   name: "itemName",
 *   type: "string",
 *   description: "The name of the item.",
 *   required: true,
 * };
 * ```
 */
export interface ActionParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'object[]' | 'string[]' | 'number[]' | 'boolean[]';
  description?: string;
  enum?: string[];
  required?: boolean;
  attributes?: ActionParameter[];
}

/**
 * @interface CustomActionConfig
 * @description Configuration for a custom AI action that can be called by the Copilot.
 * @property {string} name - The unique name of the action.
 * @property {string} description - A description of what the action does.
 * @property {ActionParameter[]} parameters - An array of parameters the action accepts.
 * @property {(args: unknown) => void | Promise<void>} handler - The function that executes when the action is called.
 * @property {(props: unknown) => React.ReactNode} [render] - Optional React component to render when the action is executed (for Generative UI).
 * @example
 * ```typescript
 * const myAction: CustomActionConfig = {
 *   name: "greetUser",
 *   description: "Greets the user by name.",
 *   parameters: [{ name: "name", type: "string", required: true }],
 *   handler: ({ name }) => alert(`Hello, ${name}!`),
 * };
 * ```
 */
export interface CustomActionConfig {
  name: string;
  description: string;
  parameters: ActionParameter[];
  handler: (args: unknown) => void | Promise<void>;
  render?: (props: unknown) => React.ReactNode;
}

/**
 * @interface NavigationItem
 * @description Defines a single item in the application's navigation menu.
 * @property {string} label - The display text for the navigation item.
 * @property {string} href - The URL path for the navigation item.
 * @property {string} description - A brief description of the navigation item's destination.
 * @property {React.ComponentType} [icon] - Optional icon component to display next to the label.
 * @property {string} [badge] - Optional badge text to display (e.g., "New", "Beta").
 * @example
 * ```typescript
 * const navItem: NavigationItem = {
 *   label: "Dashboard",
 *   href: "/dashboard",
 *   description: "Main AI assistant dashboard.",
 * };
 * ```
 */
export interface NavigationItem {
  label: string;
  href: string;
  description: string;
  icon?: React.ComponentType;
  badge?: string;
}

/**
 * @interface PageMetadata
 * @description Metadata for an application page, used for SEO and feature description.
 * @property {string} title - The title of the page.
 * @property {string} description - A concise description of the page's content.
 * @property {string[]} features - A list of key features or functionalities present on the page.
 * @property {string} [codeExample] - Optional code example relevant to the page.
 * @property {string} [documentationLink] - Optional link to external documentation.
 * @example
 * ```typescript
 * const researchPageMeta: PageMetadata = {
 *   title: "Research Workspace",
 *   description: "AI-powered document analysis and report generation.",
 *   features: ["Document Upload", "AI Summarization", "Report Export"],
 * };
 * ```
 */
export interface PageMetadata {
  title: string;
  description: string;
  features: string[];
  codeExample?: string;
  documentationLink?: string;
}

// NOTE: Add placeholders for Research, Workflow, Analytics, and Agent Management specific types
// These will be detailed as specific pages are implemented.

/**
 * @interface ResearchSpecificType
 * @description Placeholder for research-specific types.
 * @remarks This interface will be expanded as the research workspace page is developed.
 */
export interface ResearchSpecificType {
  _placeholder?: boolean;
  // TODO: Define properties for research-specific data structures
  // @version 1.0.0
  // @author Cline
  // @date 2025-07-17
  // @module AppTypes
}

/**
 * @interface WorkflowSpecificType
 * @description Placeholder for workflow-specific types.
 * @remarks This interface will be expanded as the workflow automation page is developed.
 */
export interface WorkflowSpecificType {
  _placeholder?: boolean;
  // TODO: Define properties for workflow-specific data structures
  // @version 1.0.0
  // @author Cline
  // @date 2025-07-17
  // @module AppTypes
}

/**
 * @interface AnalyticsSpecificType
 * @description Placeholder for analytics-specific types.
 * @remarks This interface will be expanded as the analytics & monitoring page is developed.
 */
export interface AnalyticsSpecificType {
  _placeholder?: boolean;
  // TODO: Define properties for analytics-specific data structures
  // @version 1.0.0
  // @author Cline
  // @date 2025-07-17
  // @module AppTypes
}

/**
 * @interface AgentManagementSpecificType
 * @description Placeholder for agent management-specific types.
 * @remarks This interface will be expanded as the agent management page is developed.
 */
export interface AgentManagementSpecificType {
  _placeholder?: boolean;
  // TODO: Define properties for agent management data structures
  // @version 1.0.0
  // @author Cline
  // @date 2025-07-17
  // @module AppTypes
}
