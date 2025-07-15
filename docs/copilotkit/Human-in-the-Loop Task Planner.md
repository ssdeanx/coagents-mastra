# 🤝 Human-in-the-Loop Task Planner

## What This Demo Shows

This demo showcases CopilotKit's **human-in-the-loop** capabilities:
1. **Collaborative Planning**: The Copilot generates task steps and lets you decide which ones to perform
2. **Interactive Decision Making**: Select or deselect steps to customize the execution plan
3. **Adaptive Responses**: The Copilot adapts its execution based on your choices, even handling missing steps

## How to Interact

Try these steps to experience the demo:
1. Ask your Copilot to help with a task, such as:
   - "Make me a sandwich"
   - "Plan a weekend trip"
   - "Organize a birthday party"
   - "Start a garden"

2. Review the suggested steps provided by your Copilot

3. Select or deselect steps using the checkboxes to customize the plan
   - Try removing essential steps to see how the Copilot adapts!

4. Click "Execute Plan" to see the outcome based on your selections

## ✨ Human-in-the-Loop Magic in Action

**What's happening technically:**
- The agent analyzes your request and breaks it down into logical steps
- These steps are presented to you through a dynamic UI component
- Your selections are captured as user input
- The agent considers your choices when executing the plan
- The agent adapts to missing steps with creative problem-solving

**What you'll see in this demo:**
- The Copilot provides a detailed, step-by-step plan for your task
- You have complete control over which steps to include
- If you remove essential steps, the Copilot provides entertaining and creative workarounds
- The final execution reflects your choices, showing how human input shapes the outcome
- Each response is tailored to your specific selections

This human-in-the-loop pattern creates a powerful collaborative experience where both human judgment and AI capabilities work together to achieve better results than either could alone! 

```tsx
"use client";

import React, { useState, useEffect } from "react";

import "@copilotkit/react-ui/styles.css";

import "./style.css";

import { CopilotKit, useCopilotAction } from "@copilotkit/react-core";

import { CopilotChat } from "@copilotkit/react-ui";

  

const HumanInTheLoop: React.FC = () => {

return (

<CopilotKit

runtimeUrl="/api/copilotkit"

showDevConsole={false}

// agent lock to the relevant agent

agent="humanInTheLoopAgent"

>

<Chat />

</CopilotKit>

);

};

  

const Chat = () => {

useCopilotAction({

name: "generateTaskSteps",

description:

"Make up 10 steps (only a couple of words per step) that are required for a task. The step should be in imperative form (i.e. Dig hole, Open door, ...)",

parameters: [

{

name: "steps",

description:

"An array of 10 step objects, each containing text and status",

type: "object[]",

attributes: [

{

name: "description",

type: "string",

description: "The text of the step in imperative form",

},

{

name: "status",

type: "string",

enum: ["enabled", "disabled", "executing"],

description: "The status of the step, always 'enabled'",

},

],

},

],

renderAndWaitForResponse: ({ args, respond, status }) => {

return <StepsFeedback args={args} respond={respond} status={status} />;

},

});

  

return (

<div className="flex justify-center items-center h-full w-full">

<div className="w-8/10 h-8/10 rounded-lg">

<CopilotChat

className="h-full rounded-2xl"

labels={{

initial:

"Hi, I'm an agent specialized in helping you with your tasks. How can I help you?",

}}

/>

</div>

</div>

);

};

  

const StepsFeedback = ({

args,

respond,

status,

}: {

args: any;

respond: any;

status: any;

}) => {

const [localSteps, setLocalSteps] = useState<

{

description: string;

status: "disabled" | "enabled" | "executing";

}[]

>([]);

  

useEffect(() => {

if (status === "executing" && localSteps.length === 0) {

setLocalSteps(args.steps);

}

}, [status, args.steps, localSteps]);

  

if (args.steps === undefined || args.steps.length === 0) {

return <></>;

}

  

const steps = localSteps.length > 0 ? localSteps : args.steps;

  

const handleCheckboxChange = (index: number) => {

setLocalSteps((prevSteps) =>

prevSteps.map((step, i) =>

i === index

? {

...step,

status: step.status === "enabled" ? "disabled" : "enabled",

}

: step

)

);

};

  

return (

<div className="flex flex-col gap-4 w-[500px] bg-gray-100 rounded-lg p-8 mb-4">

<div className=" text-black space-y-2">

<h2 className="text-lg font-bold mb-4">Select Steps</h2>

{steps.map((step: any, index: any) => (

<div key={index} className="text-sm flex items-center">

<input

type="checkbox"

checked={step.status === "enabled"}

onChange={() => handleCheckboxChange(index)}

className="mr-2"

/>

<span

className={

step.status !== "enabled" && status != "inProgress"

? "line-through"

: ""

}

>

{step.description}

</span>

</div>

))}

{status === "executing" && (

<button

className="mt-4 bg-gradient-to-r from-purple-400 to-purple-600 text-white py-2 px-4 rounded cursor-pointer w-48 font-bold"

onClick={() => {

const selectedSteps = localSteps

.filter((step) => step.status === "enabled")

.map((step) => step.description);

respond(

"The user selected the following steps: " +

selectedSteps.join(", ")

);

}}

>

✨ Perform Steps

</button>

)}

</div>

</div>

);

};

  

function Spinner() {

return (

<svg

className="mr-2 size-3 animate-spin text-slate-500"

xmlns="http://www.w3.org/2000/svg"

fill="none"

viewBox="0 0 24 24"

>

<circle

className="opacity-25"

cx="12"

cy="12"

r="10"

stroke="currentColor"

strokeWidth="4"

></circle>

<path

className="opacity-75"

fill="currentColor"

d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"

></path>

</svg>

);

}

export default HumanInTheLoop;
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