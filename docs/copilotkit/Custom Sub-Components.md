---
title: "Custom Sub-Components"
source: "https://docs.copilotkit.ai/mastra/shared-guides/custom-look-and-feel/bring-your-own-components?undefined=Code"
author:
published:
created: 2025-07-15
description:
tags:
  - "clippings"
---
We're officially launching AG-UI, the protocol for agent and user interactivity! [Learn more](https://ag-ui.com/).

You can swap out any of the sub-components of any Copilot UI to build up a completely custom look and feel. All components are fully typed with TypeScript for better development experience.

## UserMessage

The user message is what displays when the user sends a message to the chat. In this example, we change the color and add an avatar.

The main thing to be aware of here is the `message` prop, which is the message text from the user.

## AssistantMessage

The assistant message is what displays when the LLM responds to a user message. In this example, we remove the background color and add an avatar.

```tsx
import { AssistantMessageProps } from "@copilotkit/react-ui";

import { useChatContext } from "@copilotkit/react-ui";

import { Markdown } from "@copilotkit/react-ui";

import { SparklesIcon } from "@heroicons/react/24/outline";

 

import { CopilotKit } from "@copilotkit/react-core";

import { CopilotSidebar } from "@copilotkit/react-ui";

import "@copilotkit/react-ui/styles.css";

 

const CustomAssistantMessage = (props: AssistantMessageProps) => {

  const { icons } = useChatContext();

  const { message, isLoading, subComponent } = props;

 

  const avatarStyles = "bg-zinc-400 border-zinc-500 shadow-lg min-h-10 min-w-10 rounded-full text-white flex items-center justify-center";

  const messageStyles = "px-4 rounded-xl pt-2";

 

  const avatar = <div className={avatarStyles}><SparklesIcon className="h-6 w-6" /></div>

 

  return (

    <div className="py-2">

      <div className="flex items-start">

        {!subComponent && avatar}

        <div className={messageStyles}>

          {message && <Markdown content={message || ""} /> }

          {isLoading && icons.spinnerIcon}

        </div>

      </div>

      <div className="my-2">{subComponent}</div>

    </div>

  );

};

 

<CopilotKit>

  <CopilotSidebar AssistantMessage={CustomAssistantMessage} />

</CopilotKit>
```

**Key concepts**

- `subComponent` - This is where any generative UI will be rendered.
- `message` - This is the message text from the LLM, typically in markdown format.
- `isLoading` - This is a boolean that indicates if the message is still loading.

## Window

The window is the main container for the chat. In this example, we turn it into a more traditional modal.

## Button

The `CopilotSidebar` and `CopilotPopup` components allow you to customize their trigger button by passing in a custom Button component.

The header component is the top of the chat window. In this example, we add a button to the left of the title with a custom icon.

## Messages

The Messages component handles the display and organization of different message types in the chat interface. Its complexity comes from managing various message types (text, actions, results, and agent states) and maintaining proper scroll behavior.

```tsx
import { MessagesProps, CopilotSidebar } from "@copilotkit/react-ui";

import { useCopilotChat } from "@copilotkit/react-core";

import { CopilotKit } from "@copilotkit/react-core";

import "@copilotkit/react-ui/styles.css";

function CustomMessages({

  messages,

  inProgress,

  RenderTextMessage,

  RenderActionExecutionMessage,

  RenderResultMessage,

  RenderAgentStateMessage,

}: MessagesProps) {

  const wrapperStyles = "p-4 flex flex-col gap-2 h-full overflow-y-auto bg-indigo-300";

 

  /*

    Message types handled:

    - TextMessage: Regular chat messages

    - ActionExecutionMessage: When the LLM executes an action

    - ResultMessage: Results from actions

    - AgentStateMessage: Status updates from CoAgents

  */

  return (

    <div className={wrapperStyles}>

      {messages.map((message, index) => {

        if (message.isTextMessage()) {

          return <RenderTextMessage 

            key={message.id} 

            message={message} 

            inProgress={inProgress} 

            index={index} 

            isCurrentMessage={index === messages.length - 1}

          />;

        } else if (message.isActionExecutionMessage()) {

          return <RenderActionExecutionMessage 

            key={message.id} 

            message={message} 

            inProgress={inProgress} 

            index={index} 

            isCurrentMessage={index === messages.length - 1}

          />;

        } else if (message.isResultMessage()) {

          return <RenderResultMessage 

            key={message.id} 

            message={message} 

            inProgress={inProgress} 

            index={index} 

            isCurrentMessage={index === messages.length - 1}

          />;

        } else if (message.isAgentStateMessage()) {

          return <RenderAgentStateMessage 

              key={message.id} 

              message={message} 

              inProgress={inProgress} 

              index={index} 

              isCurrentMessage={index === messages.length - 1}

            />;

        }

      })}

    </div>

  );

}

 

<CopilotKit>

  <CopilotSidebar Messages={CustomMessages} />

</CopilotKit>
```

## Suggestions

The suggestions component allows you to customize how suggestions are displayed. In this example, we add a label to the list and change the suggestion chip look

The main thing to be aware of here is the `message` prop, which is the message text from the user.

## Input

The input component that the user interacts with to send messages to the chat. In this example, we customize it to have a custom "Ask" button and placeholder text.

```tsx
import { InputProps, CopilotSidebar } from "@copilotkit/react-ui";

import { CopilotKit } from "@copilotkit/react-core";

import "@copilotkit/react-ui/styles.css";

function CustomInput({ inProgress, onSend, isVisible }: InputProps) {

  const handleSubmit = (value: string) => {

    if (value.trim()) onSend(value);

  };

 

  const wrapperStyle = "flex gap-2 p-4 border-t";

  const inputStyle = "flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 disabled:bg-gray-100";

  const buttonStyle = "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed";

 

  return (

    <div className={wrapperStyle}>

      <input 

        disabled={inProgress}

        type="text" 

        placeholder="Ask your question here..." 

        className={inputStyle}

        onKeyDown={(e) => {

          if (e.key === 'Enter') {

            handleSubmit(e.currentTarget.value);

            e.currentTarget.value = '';

          }

        }}

      />

      <button 

        disabled={inProgress}

        className={buttonStyle}

        onClick={(e) => {

          const input = e.currentTarget.previousElementSibling as HTMLInputElement;

          handleSubmit(input.value);

          input.value = '';

        }}

      >

        Ask

      </button>

    </div>

  );

}

 

<CopilotKit>

  <CopilotSidebar Input={CustomInput} />

</CopilotKit>
```

## Actions

Actions allow the LLM to interact with your application's functionality. When an action is called by the LLM, you can provide custom components to visualize its execution and results. This example demonstrates a calendar meeting card implementation.

```tsx
"use client" // only necessary if you are using Next.js with the App Router.

import { useCopilotAction } from "@copilotkit/react-core"; 

 

export function YourComponent() {

  useCopilotAction({ 

    name: "showCalendarMeeting",

    description: "Displays calendar meeting information",

    parameters: [

      {

        name: "date",

        type: "string",

        description: "Meeting date (YYYY-MM-DD)",

        required: true

      },

      {

        name: "time",

        type: "string",

        description: "Meeting time (HH:mm)",

        required: true

      },

      {

        name: "meetingName",

        type: "string",

        description: "Name of the meeting",

        required: false

      }

    ],

    render: ({ status, args }) => {

      const { date, time, meetingName } = args;

 

      if (status === 'inProgress') {

        return <LoadingView />; // Your own component for loading state

      } else {

        const meetingProps: CalendarMeetingCardProps = {

          date: date,

          time,

          meetingName

        };

        return <CalendarMeetingCardComponent {...meetingProps} />;

      }

    },

  });

 

  return (

    <>...</>

  );

}
```

## Agent State

The Agent State component allows you to visualize the internal state and progress of your CoAgents. When working with CoAgents, you can provide a custom component to render the agent's state. This example demonstrates a progress bar that updates as the agent runs.

```tsx
"use client"; // only necessary if you are using Next.js with the App Router.

 

import { useCoAgentStateRender } from "@copilotkit/react-core";

import { Progress } from "./progress";

 

type AgentState = {

  logs: string[];

}

 

useCoAgentStateRender<AgentState>({

  name: "basic_agent",

  render: ({ state, nodeName, status }) => {

    if (!state.logs || state.logs.length === 0) {

      return null;

    }

 

    // Progress is a component we are omitting from this example for brevity.

    return <Progress logs={state.logs} />; 

  },

});
```[Previous](https://docs.copilotkit.ai/mastra/shared-guides/custom-look-and-feel/customize-built-in-ui-components)

[

Styling Copilot UI

](https://docs.copilotkit.ai/mastra/shared-guides/custom-look-and-feel/customize-built-in-ui-components)[

Next

Fully Headless UI

](https://docs.copilotkit.ai/mastra/shared-guides/custom-look-and-feel/headless-ui)

### On this page

No Headings

![](https://static.scarf.sh/a.png?x-pxid=ffc9f65d-0186-4575-b065-61d62ea9d7d3)