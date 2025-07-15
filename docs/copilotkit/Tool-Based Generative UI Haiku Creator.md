
# 🪶 Tool-Based Generative UI Haiku Creator

## What This Demo Shows

This demo showcases CopilotKit's **tool-based generative UI** capabilities:
1. **Frontend Rendering of Tool Calls**: Backend tool calls are automatically rendered in the UI
2. **Dynamic UI Generation**: The UI updates in real-time as the agent generates content
3. **Elegant Content Presentation**: Complex structured data (haikus) are beautifully displayed

## How to Interact

Chat with your Copilot and ask for haikus about different topics:
- "Create a haiku about nature"
- "Write a haiku about technology"
- "Generate a haiku about the changing seasons"
- "Make a humorous haiku about programming"

Each request will trigger the agent to generate a haiku and display it in a visually appealing card format in the UI.

## ✨ Tool-Based Generative UI in Action

**What's happening technically:**
- The agent processes your request and determines it should create a haiku
- It calls a backend tool that returns structured haiku data
- CopilotKit automatically renders this tool call in the frontend
- The rendering is handled by the registered tool component in your React app
- No manual state management is required to display the results

**What you'll see in this demo:**
- As you request a haiku, a beautifully formatted card appears in the UI
- The haiku follows the traditional 5-7-5 syllable structure
- Each haiku is presented with consistent styling
- Multiple haikus can be generated in sequence
- The UI adapts to display each new piece of content

This pattern of tool-based generative UI can be extended to create any kind of dynamic content - from data visualizations to interactive components, all driven by your Copilot's tool calls! 

- page.tsx example

```tsx
"use client";

import { CopilotKit, useCopilotAction } from "@copilotkit/react-core";

import { CopilotKitCSSProperties, CopilotSidebar } from "@copilotkit/react-ui";

import { useState } from "react";

import "@copilotkit/react-ui/styles.css";

import "./style.css";

  

export default function AgenticChat() {

return (

<CopilotKit

runtimeUrl="/api/copilotkit"

showDevConsole={false}

// agent lock to the relevant agent

agent="toolBasedGenerativeUiAgent"

>

<div

className="min-h-full w-full flex items-center justify-center"

style={

{

// "--copilot-kit-primary-color": "#222",

// "--copilot-kit-separator-color": "#CCC",

} as CopilotKitCSSProperties

}

>

<Haiku />

<CopilotSidebar

defaultOpen={true}

labels={{

title: "Haiku Generator",

initial: "I'm a haiku generator 👋. How can I help you?",

}}

clickOutsideToClose={false}

/>

</div>

</CopilotKit>

);

}

  

function Haiku() {

const [haiku, setHaiku] = useState<{

japanese: string[];

english: string[];

}>({

japanese: ["仮の句よ", "まっさらながら", "花を呼ぶ"],

english: [

"A placeholder verse—",

"even in a blank canvas,",

"it beckons flowers.",

],

});

  

useCopilotAction({

name: "generateHaiku",

description: "Generate a haiku in Japanese and its English translation",

parameters: [

{

name: "japanese",

type: "string[]",

description: "An array of three lines of the haiku in Japanese",

},

{

name: "english",

type: "string[]",

description: "An array of three lines of the haiku in English",

},

],

followUp: false,

handler: async () => {

return "Haiku generated.";

},

render: ({ args: generatedHaiku, result, status }) => {

return (

<HaikuApproval

setHaiku={setHaiku}

generatedHaiku={generatedHaiku}

status={status}

/>

);

},

});

return (

<>

<div className="text-left">

{haiku?.japanese.map((line, index) => (

<div className="flex items-center gap-6 mb-2" key={index}>

<p className="text-4xl font-bold text-gray-500">{line}</p>

<p className="text-base font-light">{haiku?.english?.[index]}</p>

</div>

))}

</div>

</>

);

}

  

interface HaikuApprovalProps {

setHaiku: any;

status: any;

generatedHaiku: any;

}

  

function HaikuApproval({

setHaiku,

status,

generatedHaiku,

}: HaikuApprovalProps) {

const [isApplied, setIsApplied] = useState(false);

if (

!generatedHaiku ||

!generatedHaiku.japanese ||

!generatedHaiku.japanese.length

) {

return <></>;

}

  

return (

<div className="text-left rounded-md p-4 mt-4 mb-4 flex flex-col bg-gray-100 dark:bg-zinc-900">

<div

className={status === "complete" ? "border-b border-gray-300 mb-4" : ""}

>

{generatedHaiku?.japanese?.map((line: string, index: number) => (

<div className="flex items-center gap-3 mb-2 pb-2" key={index}>

<p className="text-lg font-bold">{line}</p>

<p className="text-sm font-light">

{generatedHaiku?.english?.[index]}

</p>

</div>

))}

</div>

{status === "complete" && (

<button

onClick={() => {

setHaiku(generatedHaiku);

setIsApplied(true);

}}

className="ml-auto px-3 py-1 bg-white dark:bg-black text-black dark:text-white text-sm rounded cursor-pointer font-sm border "

>

{isApplied ? "Applied ✓" : "Apply"}

</button>

)}

</div>

);

}
```

- styles.css

```css
.copilotKitWindow {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

```