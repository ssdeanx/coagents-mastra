---
title: "useCopilotChat"
source: "https://docs.copilotkit.ai/reference/hooks/useCopilotChat"
author:
published:
created: 2025-07-15
description:
tags:
  - "clippings"
---
We're officially launching AG-UI, the protocol for agent and user interactivity! [Learn more](https://ag-ui.com/).

`useCopilotChat` is a React hook that lets you directly interact with the Copilot instance. Use to implement a fully custom UI (headless UI) or to programmatically interact with the Copilot instance managed by the default UI.

## Usage

### Simple Usage

```
import { useCopilotChat } from "@copilotkit/react-core";

import { Role, TextMessage } from "@copilotkit/runtime-client-gql";

 

export function YourComponent() {

  const { appendMessage } = useCopilotChat();

 

  appendMessage(

    new TextMessage({

      content: "Hello World",

      role: Role.User,

    }),

  );

 

  // optionally, you can append a message without running chat completion

  appendMessage(yourMessage, { followUp: false });

}
```

`useCopilotChat` returns an object with the following properties:

```
const {

  visibleMessages, // An array of messages that are currently visible in the chat.

  appendMessage, // A function to append a message to the chat.

  setMessages, // A function to set the messages in the chat.

  deleteMessage, // A function to delete a message from the chat.

  reloadMessages, // A function to reload the messages from the API.

  stopGeneration, // A function to stop the generation of the next message.

  reset, // A function to reset the chat.

  isLoading, // A boolean indicating if the chat is loading.

} = useCopilotChat();
```

## Parameters

initialMessages Message\[\]

System messages of the chat. Defaults to an empty array.

makeSystemMessage SystemMessageFunction

A function to generate the system message. Defaults to `defaultSystemMessage`.[Previous](https://docs.copilotkit.ai/reference/hooks/useCopilotAdditionalInstructions)

[

useCopilotAdditionalInstructions

](https://docs.copilotkit.ai/reference/hooks/useCopilotAdditionalInstructions)[

Next

useCopilotChatSuggestions

](https://docs.copilotkit.ai/reference/hooks/useCopilotChatSuggestions)

### On this page

No Headings

![](https://static.scarf.sh/a.png?x-pxid=ffc9f65d-0186-4575-b065-61d62ea9d7d3)