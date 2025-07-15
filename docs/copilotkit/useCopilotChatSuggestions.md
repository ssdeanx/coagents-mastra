---
title: "useCopilotChatSuggestions"
source: "https://docs.copilotkit.ai/reference/hooks/useCopilotChatSuggestions"
author:
published:
created: 2025-07-15
description: "The useCopilotChatSuggestions hook generates suggestions in the chat window based on real-time app state."
tags:
  - "clippings"
---
We're officially launching AG-UI, the protocol for agent and user interactivity! [Learn more](https://ag-ui.com/).

The useCopilotChatSuggestions hook generates suggestions in the chat window based on real-time app state.

`useCopilotReadable` is a React hook that provides app-state and other information to the Copilot. Optionally, the hook can also handle hierarchical state within your application, passing these parent-child relationships to the Copilot.

  
![](https://docs.copilotkit.ai/images/use-copilot-chat-suggestions/use-copilot-chat-suggestions.gif)

## Usage

### Install Dependencies

This component is part of the [@copilotkit/react-ui](https://npmjs.com/package/@copilotkit/react-ui) package.

```
npm install @copilotkit/react-core @copilotkit/react-ui
```

### Simple Usage

```
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";

 

export function MyComponent() {

  const [employees, setEmployees] = useState([]);

 

  useCopilotChatSuggestions({

    instructions: \`The following employees are on duty: ${JSON.stringify(employees)}\`,

  });

}
```

### Dependency Management

```
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";

 

export function MyComponent() {

  useCopilotChatSuggestions(

    {

      instructions: "Suggest the most relevant next actions.",

    },

    [appState],

  );

}
```

In the example above, the suggestions are generated based on the given instructions. The hook monitors `appState`, and updates suggestions accordingly whenever it changes.

### Behavior and Lifecycle

The hook registers the configuration with the chat context upon component mount and removes it on unmount, ensuring a clean and efficient lifecycle management.

## Parameters

instructions string

A prompt or instructions for the GPT to generate suggestions.

minSuggestions number

Default:"1"

The minimum number of suggestions to generate. Defaults to `1`.

maxSuggestions number

Default:"1"

The maximum number of suggestions to generate. Defaults to `3`.

available 'enabled' | 'disabled'

Default:"enabled"

Whether the suggestions are available. Defaults to `enabled`.

className string

An optional class name to apply to the suggestions.[Previous](https://docs.copilotkit.ai/reference/hooks/useCopilotChat)

[

useCopilotChat

](https://docs.copilotkit.ai/reference/hooks/useCopilotChat)[

Next

useCoAgent

](https://docs.copilotkit.ai/reference/hooks/useCoAgent)

### On this page

No Headings

![](https://static.scarf.sh/a.png?x-pxid=ffc9f65d-0186-4575-b065-61d62ea9d7d3)