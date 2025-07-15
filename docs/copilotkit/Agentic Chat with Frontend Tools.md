
# 🤖 Agentic Chat with Frontend Tools

## What This Demo Shows

This demo showcases CopilotKit's **agentic chat** capabilities with **frontend tool integration**:
1. **Natural Conversation**: Chat with your Copilot in a familiar chat interface
2. **Frontend Tool Execution**: The Copilot can directly interacts with your UI by calling frontend functions
3. **Seamless Integration**: Tools defined in the frontend and automatically discovered and made available to the agent

## How to Interact

Try asking your Copilot to:
- "Can you change the background color to something more vibrant?"
- "Make the background a blue to purple gradient"
- "Set the background to a sunset-themed gradient"
- "Change it back to a simple light color"

You can also chat about other topics - the agent will respond conversationally while having the ability to use your UI tools when appropriate.

## ✨ Frontend Tool Integration in Action

**What's happening technically:**
- The React component defines a frontend function using `useCopilotAction`
- CopilotKit automatically exposes this function to the agent
- When you make a request, the agent determines whether to use the tool
- The agent calls the function with the appropriate parameters
- The UI immediately updates in response

**What you'll see in this demo:**
- The Copilot understands requests to change the background
- It generates CSS values for colors and gradients
- When it calls the tool, the background changes instantly
- The agent provides a conversational response about the changes it made

This technique of exposing frontend functions to your Copilot can be extended to any UI manipulation you want to enable, from theme changes to data filtering, navigation, or complex UI state management! 

```tsx
"use client";

import React, { useState } from "react";

import "@copilotkit/react-ui/styles.css";

import "./style.css";

import {

CopilotKit,

useCopilotAction,

useCopilotChat,

} from "@copilotkit/react-core";

import { CopilotChat } from "@copilotkit/react-ui";

  

const AgenticChat: React.FC = () => {

return (

<CopilotKit

runtimeUrl="/api/copilotkit"

showDevConsole={false}

// agent lock to the relevant agent

agent="agenticChatAgent"

>

<Chat />

</CopilotKit>

);

};

  

const Chat = () => {

const [background, setBackground] = useState<string>(

"--copilot-kit-background-color"

);

  

useCopilotAction({

name: "changeBackgroundTool",

description:

"Change the background color of the chat. Can be anything that the CSS background attribute accepts. Regular colors, linear of radial gradients etc.",

parameters: [

{

name: "background",

type: "string",

description: "The background. Prefer gradients.",

},

],

handler: ({ background }) => {

setBackground(background);

},

followUp: false,

});

  

return (

<div

className="flex justify-center items-center h-full w-full"

style={{ background }}

>

<div className="w-8/10 h-8/10 rounded-lg">

<CopilotChat

className="h-full rounded-2xl"

labels={{ initial: "Hi, I'm an agent. Want to chat?" }}

/>

</div>

</div>

);

};

  

export default AgenticChat;
```

```css
.copilotKitInput {
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  border: 1px solid var(--copilot-kit-separator-color) !important;
}
  
.copilotKitChat {
  background-color: #fff !important;
}
  
```