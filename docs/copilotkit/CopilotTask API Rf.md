---
title: "CopilotTask"
source: "https://docs.copilotkit.ai/reference/classes/CopilotTask"
author:
published:
created: 2025-07-15
description: "CopilotTask is used to execute one-off tasks, for example on button click."
tags:
  - "clippings"
---
We're officially launching AG-UI, the protocol for agent and user interactivity! [Learn more](https://ag-ui.com/).

CopilotTask is used to execute one-off tasks, for example on button click.

This class is used to execute one-off tasks, for example on button press. It can use the context available via [useCopilotReadable](https://docs.copilotkit.ai/reference/hooks/useCopilotReadable) and the actions provided by [useCopilotAction](https://docs.copilotkit.ai/reference/hooks/useCopilotAction), or you can provide your own context and actions.

## Example

In the simplest case, use CopilotTask in the context of your app by giving it instructions on what to do.

```
import { CopilotTask, useCopilotContext } from "@copilotkit/react-core";

 

export function MyComponent() {

  const context = useCopilotContext();

 

  const task = new CopilotTask({

    instructions: "Set a random message",

    actions: [

      {

        name: "setMessage",

      description: "Set the message.",

      argumentAnnotations: [

        {

          name: "message",

          type: "string",

          description:

            "A message to display.",

          required: true,

        },

      ],

     }

    ]

  });

 

  const executeTask = async () => {

    await task.run(context, action);

  }

 

  return (

    <>

      <button onClick={executeTask}>

        Execute task

      </button>

    </>

  )

}
```

Have a look at the [Presentation Example App](https://github.com/CopilotKit/CopilotKit/blob/main/CopilotKit/examples/next-openai/src/app/presentation/page.tsx) for a more complete example.

## Constructor Parameters

instructions string

The instructions to be given to the assistant.

actions FrontendAction<any>\[\]

An array of action definitions that can be called.

includeCopilotReadable boolean

Whether to include the copilot readable context in the task.

includeCopilotActions boolean

Whether to include actions defined via useCopilotAction in the task.

forwardedParameters ForwardedParametersInput

The forwarded parameters to use for the task.

run context: CopilotContextParams, data?: T

Run the task.

context CopilotContextParams

The CopilotContext to use for the task. Use `useCopilotContext` to obtain the current context.

data T

The data to use for the task.[Previous](https://docs.copilotkit.ai/reference/classes/llm-adapters/GoogleGenerativeAIAdapter)

[

GoogleGenerativeAIAdapter

](https://docs.copilotkit.ai/reference/classes/llm-adapters/GoogleGenerativeAIAdapter)[

Next

Remote Endpoints

](https://docs.copilotkit.ai/reference/sdk/python/RemoteEndpoints)

### On this page

No Headings

![](https://static.scarf.sh/a.png?x-pxid=ffc9f65d-0186-4575-b065-61d62ea9d7d3)