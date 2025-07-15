---
title: "CopilotSidebar"
source: "https://docs.copilotkit.ai/reference/components/chat/CopilotSidebar"
author:
published:
created: 2025-07-15
description: "The CopilotSidebar component, providing a sidebar interface for interacting with your copilot."
tags:
  - "clippings"
---
We're officially launching AG-UI, the protocol for agent and user interactivity! [Learn more](https://ag-ui.com/).

[Chat Components](https://docs.copilotkit.ai/reference/components/chat)

The CopilotSidebar component, providing a sidebar interface for interacting with your copilot.

  
![](https://docs.copilotkit.ai/images/CopilotSidebar.gif)

A chatbot sidebar component for the CopilotKit framework. Highly customizable through various props and custom CSS.

See [CopilotPopup](https://docs.copilotkit.ai/reference/components/chat/CopilotPopup) for a popup version of this component.

## Install Dependencies

This component is part of the [@copilotkit/react-ui](https://npmjs.com/package/@copilotkit/react-ui) package.

```
npm install @copilotkit/react-core @copilotkit/react-ui
```

## Usage

### Look & Feel

By default, CopilotKit components do not have any styles. You can import CopilotKit's stylesheet at the root of your project:

YourRootComponent.tsx

```
...

import "@copilotkit/react-ui/styles.css"; 

 

export function YourRootComponent() {

  return (

    <CopilotKit>

      ...

    </CopilotKit>

  );

}
```

For more information about how to customize the styles, check out the [Customize Look & Feel](https://docs.copilotkit.ai/guides/custom-look-and-feel/customize-built-in-ui-components) guide.

## Properties

instructions string

Custom instructions to be added to the system message. Use this property to provide additional context or guidance to the language model, influencing its responses. These instructions can include specific directions, preferences, or criteria that the model should consider when generating its output, thereby tailoring the conversation more precisely to the user's needs or the application's requirements.

onInProgress (inProgress: boolean) => void

A callback that gets called when the in progress state changes.

onSubmitMessage (message: string) => void | Promise<void>

A callback that gets called when a new message it submitted.

onStopGeneration OnStopGeneration

A custom stop generation function.

onReloadMessages OnReloadMessages

A custom reload messages function.

onRegenerate (messageId: string) => void

A callback function to regenerate the assistant's response

onCopy (message: string) => void

A callback function when the message is copied

onThumbsUp (message: TextMessage) => void

A callback function for thumbs up feedback

onThumbsDown (message: TextMessage) => void

A callback function for thumbs down feedback

markdownTagRenderers ComponentsMap

A list of markdown components to render in assistant message. Useful when you want to render custom elements in the message (e.g a reference tag element)

icons CopilotChatIcons

Icons can be used to set custom icons for the chat window.

labels CopilotChatLabels

Labels can be used to set custom labels for the chat window.

imageUploadsEnabled boolean

Enable image upload button (image inputs only supported on some models)

inputFileAccept string

The 'accept' attribute for the file input used for image uploads. Defaults to "image".

makeSystemMessage SystemMessageFunction

A function that takes in context string and instructions and returns the system message to include in the chat request. Use this to completely override the system message, when providing instructions is not enough.

AssistantMessage React.ComponentType<AssistantMessageProps>

A custom assistant message component to use instead of the default.

UserMessage React.ComponentType<UserMessageProps>

A custom user message component to use instead of the default.

Messages React.ComponentType<MessagesProps>

A custom Messages component to use instead of the default.

RenderTextMessage React.ComponentType<RenderMessageProps>

A custom RenderTextMessage component to use instead of the default.

RenderActionExecutionMessage React.ComponentType<RenderMessageProps>

A custom RenderActionExecutionMessage component to use instead of the default.

RenderAgentStateMessage React.ComponentType<RenderMessageProps>

A custom RenderAgentStateMessage component to use instead of the default.

RenderResultMessage React.ComponentType<RenderMessageProps>

A custom RenderResultMessage component to use instead of the default.

RenderImageMessage React.ComponentType<RenderMessageProps>

A custom RenderImageMessage component to use instead of the default.

RenderSuggestionsList React.ComponentType<RenderSuggestionsListProps>

A custom suggestions list component to use instead of the default.

Input React.ComponentType<InputProps>

A custom Input component to use instead of the default.

className string

A class name to apply to the root element.

children React.ReactNode

Children to render.

hideStopButton boolean

defaultOpen boolean

Default:"false"

Whether the chat window should be open by default.

clickOutsideToClose boolean

Default:"true"

If the chat window should close when the user clicks outside of it.

hitEscapeToClose boolean

Default:"true"

If the chat window should close when the user hits the Escape key.

shortcut string

Default:"'/'"

The shortcut key to open the chat window. Uses Command-\[shortcut\] on a Mac and Ctrl-\[shortcut\] on Windows.

onSetOpen (open: boolean) => void

A callback that gets called when the chat window opens or closes.

Window React.ComponentType<WindowProps>

A custom Window component to use instead of the default.

Button React.ComponentType<ButtonProps>

A custom Button component to use instead of the default.[Previous](https://docs.copilotkit.ai/reference/components/chat/CopilotPopup)

[

CopilotPopup

](https://docs.copilotkit.ai/reference/components/chat/CopilotPopup)[

Next

CopilotTextarea

](https://docs.copilotkit.ai/reference/components/CopilotTextarea)

### On this page

No Headings

![](https://static.scarf.sh/a.png?x-pxid=ffc9f65d-0186-4575-b065-61d62ea9d7d3)