---
title: "useCoAgentStateRender"
source: "https://docs.copilotkit.ai/reference/hooks/useCoAgentStateRender"
author:
published:
created: 2025-07-15
description: "The useCoAgentStateRender hook allows you to render the state of the agent in the chat."
tags:
  - "clippings"
---
We're officially launching AG-UI, the protocol for agent and user interactivity! [Learn more](https://ag-ui.com/).

The useCoAgentStateRender hook allows you to render the state of the agent in the chat.

The useCoAgentStateRender hook allows you to render UI or text based components on a Agentic Copilot's state in the chat. This is particularly useful for showing intermediate state or progress during Agentic Copilot operations.

## Usage

### Simple Usage

```
import { useCoAgentStateRender } from "@copilotkit/react-core";

 

type YourAgentState = {

  agent_state_property: string;

}

 

useCoAgentStateRender<YourAgentState>({

  name: "basic_agent",

  nodeName: "optionally_specify_a_specific_node",

  render: ({ status, state, nodeName }) => {

    return (

      <YourComponent

        agentStateProperty={state.agent_state_property}

        status={status}

        nodeName={nodeName}

      />

    );

  },

});
```

This allows for you to render UI components or text based on what is happening within the agent.

### Example

A great example of this is in our Perplexity Clone where we render the progress of an agent's internet search as it is happening. You can play around with it below or learn how to build it with its [demo](https://docs.copilotkit.ai/coagents/videos/perplexity-clone).

## Parameters

name string

The name of the coagent.

nodeName string

The node name of the coagent.

handler (props: CoAgentStateRenderHandlerArguments<T>) => void | Promise<void>

The handler function to handle the state of the agent.

render | ((props: CoAgentStateRenderProps<T>) => string | React.ReactElement | undefined | null) | string

The render function to handle the state of the agent.[Previous](https://docs.copilotkit.ai/reference/hooks/useCoAgent)

[

useCoAgent

](https://docs.copilotkit.ai/reference/hooks/useCoAgent)[

Next

useLangGraphInterrupt

](https://docs.copilotkit.ai/reference/hooks/useLangGraphInterrupt)

### On this page

No Headings

![](https://static.scarf.sh/a.png?x-pxid=ffc9f65d-0186-4575-b065-61d62ea9d7d3)