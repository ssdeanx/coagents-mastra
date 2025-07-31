# **Project Brief: Agent-Aware Action Wrappers**

## 1. Objective (The "Why")

* **Problem:** The current generative UI provides generic feedback for all AI actions, making it difficult to quickly identify which agent initiated a specific action or to provide agent-specific visual cues.
* **Goal:** Enhance the CopilotKit action wrapper component to visually distinguish actions based on the initiating AI agent, improving clarity and user experience.

## 2. Functional Requirements (The "What")

* **High-Level Approach:** The existing catch-all generative UI component will be modified to extract and display the name of the AI agent from the action's arguments. A helper function for defining frontend actions will be updated to automatically include the agent's name in the action arguments.
* **User Stories:**
  * As a developer, I want to see which AI agent initiated an action in the Generative UI so I can better understand the workflow and debugging context.
  * As a developer, I want to easily define custom frontend actions that automatically include the calling agent's name, enabling agent-specific visual feedback in the Generative UI.
  * As a user, I want the task plan action in the Human-in-the-Loop component to visually indicate the agent responsible for creating the plan.
* **Acceptance Criteria:**
  * The `GenerativeUI` component (`src/app/components/copilotkit/generative-ui.tsx`) must display a badge with the agent's name and a corresponding icon/color if an `agentName` (or `agent`) property is present in the action's `args`.
  * The `GenerativeUI` component must gracefully handle the absence of an `agentName` property in `args` by falling back to a default display.
  * The `useFrontendAction` helper function (`src/app/components/copilotkit/frontend-actions.tsx`) must accept an optional `agentName` parameter.
  * When the `agentName` parameter is provided to `useFrontendAction`, the `args` object passed to the `render` and `handler` functions of the underlying `useCopilotAction` must include this `agentName`.
  * The `createTaskPlan` action within the `HumanInTheLoop` component (`src/app/components/copilotkit/human-in-the-loop.tsx`) must be updated to use the `useFrontendAction` helper with an explicit `agentName` (e.g., "supervisorAgent") to demonstrate the new functionality.

## 3. Non-Functional Requirements

* **Performance:** The changes must have a negligible impact on rendering performance.
* **Usability:** The visual distinction for agent-initiated actions must be clear and intuitive.
* **Maintainability:** The solution should be lean and easily extendable for new agent types or visual configurations.

## 4. Scope & Boundaries (The "What Not")

* **✅ In Scope (MVP):**
  * Modifying `src/app/components/copilotkit/generative-ui.tsx` to display agent information from action arguments.
  * Adding an optional `agentName` parameter to the `useFrontendAction` helper in `src/app/components/copilotkit/frontend-actions.tsx`.
  * Updating the `createTaskPlan` action in `src/app/components/copilotkit/human-in-the-loop.tsx` to utilize the new `agentName` parameter.
  * Defining a simple, hardcoded mapping of agent names to display properties (icon, color) within `GenerativeUI`.
  * Removing the `FIXME` comment related to `useGenerativeUIAction` export in `src/app/components/copilotkit/generative-ui.tsx`.
* **❌ Out of Scope (Future Work):**
  * Modifying backend AI agents to explicitly pass `agentName` for all actions.
  * Implementing a dynamic or configurable system for agent visual properties (e.g., fetching from an API).
  * Adding agent-specific styling or custom rendering for *every* action defined in `frontend-actions.tsx`.
  * Implementing complex UI/UX for agent-specific action details beyond a simple badge.

## 5. Technical Context

* **Affected Codebase:**
  * `src/app/components/copilotkit/generative-ui.tsx`
  * `src/app/components/copilotkit/frontend-actions.tsx`
  * `src/app/components/copilotkit/human-in-the-loop.tsx`
  * `src/app/components/copilotkit/index.ts` (for export cleanup)
* **External Dependencies:**
  * No new external dependencies are required.
* **Risks & Open Questions:**
  * The effectiveness of the agent-aware display relies on backend agents consistently including their name in the action arguments. This brief focuses on the frontend capability, assuming the backend can provide this data.
  * The hardcoded agent-to-visual-property mapping in `GenerativeUI` will need manual updates if new agent types are introduced.
