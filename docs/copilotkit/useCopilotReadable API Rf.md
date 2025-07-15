---
title: "useCopilotReadable"
source: "https://docs.copilotkit.ai/reference/hooks/useCopilotReadable"
author:
published:
created: 2025-07-15
description: "The useCopilotReadable hook allows you to provide knowledge to your copilot (e.g. application state)."
tags:
  - "clippings"
---
We're officially launching AG-UI, the protocol for agent and user interactivity! [Learn more](https://ag-ui.com/).

The useCopilotReadable hook allows you to provide knowledge to your copilot (e.g. application state).

`useCopilotReadable` is a React hook that provides app-state and other information to the Copilot. Optionally, the hook can also handle hierarchical state within your application, passing these parent-child relationships to the Copilot.

## Usage

### Simple Usage

In its most basic usage, useCopilotReadable accepts a single string argument representing any piece of app state, making it available for the Copilot to use as context when responding to user input.

```
import { useCopilotReadable } from "@copilotkit/react-core";

 

export function MyComponent() {

  const [employees, setEmployees] = useState([]);

 

  useCopilotReadable({

    description: "The list of employees",

    value: employees,

  });

}
```

### Nested Components

Optionally, you can maintain the hierarchical structure of information by passing `parentId`. This allows you to use `useCopilotReadable` in nested components:

```
import { useCopilotReadable } from "@copilotkit/react-core";

 

function Employee(props: EmployeeProps) {

  const { employeeName, workProfile, metadata } = props;

 

  // propagate any information to copilot

  const employeeContextId = useCopilotReadable({

    description: "Employee name",

    value: employeeName

  });

 

  // Pass a parentID to maintain a hierarchical structure.

  // Especially useful with child React components, list elements, etc.

  useCopilotReadable({

    description: "Work profile",

    value: workProfile.description(),

    parentId: employeeContextId

  });

 

  useCopilotReadable({

    description: "Employee metadata",

    value: metadata.description(),

    parentId: employeeContextId

  });

 

  return (

    // Render as usual...

  );

}
```

## Parameters

description string

The description of the information to be added to the Copilot context.

value any

The value to be added to the Copilot context. Object values are automatically stringified.

parentId string

The ID of the parent context, if any.

categories string\[\]

An array of categories to control which context are visible where. Particularly useful with CopilotTextarea (see `useMakeAutosuggestionFunction`)

available 'enabled' | 'disabled'

Whether the context is available to the Copilot.

convert (description: string, value: any) => string

A custom conversion function to use to serialize the value to a string. If not provided, the value will be serialized using `JSON.stringify`.[Previous](https://docs.copilotkit.ai/reference/components/CopilotKit)

[

CopilotKit

](https://docs.copilotkit.ai/reference/components/CopilotKit)[

Next

useCopilotAction

](https://docs.copilotkit.ai/reference/hooks/useCopilotAction)

### On this page

No Headings

![](https://static.scarf.sh/a.png?x-pxid=ffc9f65d-0186-4575-b065-61d62ea9d7d3)