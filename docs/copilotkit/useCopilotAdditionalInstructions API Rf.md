---
title: "useCopilotAdditionalInstructions"
source: "https://docs.copilotkit.ai/reference/hooks/useCopilotAdditionalInstructions"
author:
published:
created: 2025-07-15
description: "The useCopilotAdditionalInstructions hook allows you to provide additional instructions to the agent."
tags:
  - "clippings"
---
We're officially launching AG-UI, the protocol for agent and user interactivity! [Learn more](https://ag-ui.com/).

The useCopilotAdditionalInstructions hook allows you to provide additional instructions to the agent.

`useCopilotAdditionalInstructions` is a React hook that provides additional instructions to the Copilot.

## Usage

### Simple Usage

In its most basic usage, useCopilotAdditionalInstructions accepts a single string argument representing the instructions to be added to the Copilot.

```
import { useCopilotAdditionalInstructions } from "@copilotkit/react-core";

 

export function MyComponent() {

  useCopilotAdditionalInstructions({

    instructions: "Do not answer questions about the weather.",

  });

}
```

### Conditional Usage

You can also conditionally add instructions based on the state of your app.

```
import { useCopilotAdditionalInstructions } from "@copilotkit/react-core";

 

export function MyComponent() {

  const [showInstructions, setShowInstructions] = useState(false);

 

  useCopilotAdditionalInstructions({

    available: showInstructions ? "enabled" : "disabled",

    instructions: "Do not answer questions about the weather.",

  });

}
```

## Parameters

instructions string required

The instructions to be added to the Copilot. Will be added to the instructions like so:

```
You are a helpful assistant.

Additionally, follow these instructions:

- Do not answer questions about the weather.

- Do not answer questions about the stock market.
```

available 'enabled' | 'disabled'

Whether the instructions are available to the Copilot.[Previous](https://docs.copilotkit.ai/reference/hooks/useCopilotAction)

[

useCopilotAction

](https://docs.copilotkit.ai/reference/hooks/useCopilotAction)[

Next

useCopilotChat

](https://docs.copilotkit.ai/reference/hooks/useCopilotChat)

### On this page

No Headings

![](https://static.scarf.sh/a.png?x-pxid=ffc9f65d-0186-4575-b065-61d62ea9d7d3)