---
title: "useLangGraphInterrupt"
source: "https://docs.copilotkit.ai/reference/hooks/useLangGraphInterrupt"
author:
published:
created: 2025-07-15
description: "The useLangGraphInterrupt hook allows setting the generative UI to be displayed on LangGraph's Interrupt event."
tags:
  - "clippings"
---
We're officially launching AG-UI, the protocol for agent and user interactivity! [Learn more](https://ag-ui.com/).

The useLangGraphInterrupt hook allows setting the generative UI to be displayed on LangGraph's Interrupt event.

  
<video src="/images/coagents/interrupt-flow.mp4" controls=""></video>

`useLangGraphInterrupt` is a React hook that you can use in your application to provide custom UI to be rendered when using `interrupt` by LangGraph. Once an Interrupt event is emitted, that hook would execute, allowing to receive user input with a user experience to your choice.

## Usage

### Simple Usage

app/page.tsx

```
import { useLangGraphInterrupt } from "@copilotkit/react-core"; 

// ...

 

const YourMainContent = () => {

  // ...

  // styles omitted for brevity

  useLangGraphInterrupt<string>({

    render: ({ event, resolve }) => (

      <div>

        <p>{event.value}</p>

        <form onSubmit={(e) => {

          e.preventDefault();

          resolve((e.target as HTMLFormElement).response.value);

        }}>

          <input type="text" name="response" placeholder="Enter your response" />

          <button type="submit">Submit</button>

        </form>

      </div>

    )

  });

  // ...

 

  return <div>{/* ... */}</div>

}
```

## Parameters

action Action

The action to perform when an Interrupt event is emitted. Either `handler` or `render` must be defined as arguments

name string

The name of the action.

handler (args: LangGraphInterruptRenderProps<T>) => any | Promise<any>

A handler to programmatically resolve the Interrupt, or perform operations which result will be passed to the `render` method

render (props: LangGraphInterruptRenderProps<T>) => string | React.ReactElement

Render lets you define a custom component or string to render when an Interrupt event is emitted.

enabled (args: { eventValue: TEventValue; agentMetadata: AgentSession }) => boolean

Method that returns a boolean, indicating if the interrupt action should run. Useful when using multiple interrupts

dependencies any\[\]

An optional array of dependencies.[Previous](https://docs.copilotkit.ai/reference/hooks/useCoAgentStateRender)

[

useCoAgentStateRender

](https://docs.copilotkit.ai/reference/hooks/useCoAgentStateRender)[

Next

CopilotRuntime

](https://docs.copilotkit.ai/reference/classes/CopilotRuntime)

### On this page

No Headings

![](https://static.scarf.sh/a.png?x-pxid=ffc9f65d-0186-4575-b065-61d62ea9d7d3)