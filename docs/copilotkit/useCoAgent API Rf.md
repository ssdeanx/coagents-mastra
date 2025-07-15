---
title: "useCoAgent"
source: "https://docs.copilotkit.ai/reference/hooks/useCoAgent"
author:
published:
created: 2025-07-15
description: "The useCoAgent hook allows you to share state bidirectionally between your application and the agent."
tags:
  - "clippings"
---
We're officially launching AG-UI, the protocol for agent and user interactivity! [Learn more](https://ag-ui.com/).

The useCoAgent hook allows you to share state bidirectionally between your application and the agent.

![CoAgents demonstration](https://docs.copilotkit.ai/images/coagents/SharedStateCoAgents.gif)

This hook is used to integrate an agent into your application. With its use, you can render and update the state of an agent, allowing for a dynamic and interactive experience. We call these shared state experiences agentic copilots, or CoAgents for short.

## Usage

### Simple Usage

```
import { useCoAgent } from "@copilotkit/react-core";

 

type AgentState = {

  count: number;

}

 

const agent = useCoAgent<AgentState>({

  name: "my-agent",

  initialState: {

    count: 0,

  },

});
```

`useCoAgent` returns an object with the following properties:

```
const {

  name,     // The name of the agent currently being used.

  nodeName, // The name of the current LangGraph node.

  state,    // The current state of the agent.

  setState, // A function to update the state of the agent.

  running,  // A boolean indicating if the agent is currently running.

  start,    // A function to start the agent.

  stop,     // A function to stop the agent.

  run,      // A function to re-run the agent. Takes a HintFunction to inform the agent why it is being re-run.

} = agent;
```

Finally we can leverage these properties to create reactive experiences with the agent!

```
const { state, setState } = useCoAgent<AgentState>({

  name: "my-agent",

  initialState: {

    count: 0,

  },

});

 

return (

  <div>

    <p>Count: {state.count}</p>

    <button onClick={() => setState({ count: state.count + 1 })}>Increment</button>

  </div>

);
```

This reactivity is bidirectional, meaning that changes to the state from the agent will be reflected in the UI and vice versa.

## Parameters

options UseCoagentOptions<T>

The options to use when creating the coagent.

name string

The name of the agent to use.

initialState T | any

The initial state of the agent.

state T | any

State to manage externally if you are using this hook with external state management.

setState (newState: T | ((prevState: T | undefined) => T)) => void

A function to update the state of the agent if you are using this hook with external state management.[Previous](https://docs.copilotkit.ai/reference/hooks/useCopilotChatSuggestions)

[

useCopilotChatSuggestions

](https://docs.copilotkit.ai/reference/hooks/useCopilotChatSuggestions)[

Next

useCoAgentStateRender

](https://docs.copilotkit.ai/reference/hooks/useCoAgentStateRender)

### On this page

No Headings

![](https://static.scarf.sh/a.png?x-pxid=ffc9f65d-0186-4575-b065-61d62ea9d7d3)