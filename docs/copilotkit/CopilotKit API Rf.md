---
title: "CopilotKit"
source: "https://docs.copilotkit.ai/reference/components/CopilotKit"
author:
published:
created: 2025-07-15
description: "The CopilotKit provider component, wrapping your application."
tags:
  - "clippings"
---
We're officially launching AG-UI, the protocol for agent and user interactivity! [Learn more](https://ag-ui.com/).

The CopilotKit provider component, wrapping your application.

This component will typically wrap your entire application (or a sub-tree of your application where you want to have a copilot). It provides the copilot context to all other components and hooks.

## Example

You can find more information about self-hosting CopilotKit [here](https://docs.copilotkit.ai/guides/self-hosting).

```
import { CopilotKit } from "@copilotkit/react-core";

 

<CopilotKit runtimeUrl="<your-runtime-url>">

  // ... your app ...

</CopilotKit>
```

## Properties

publicApiKey string

Your Copilot Cloud API key. Don't have it yet? Go to [https://cloud.copilotkit.ai](https://cloud.copilotkit.ai/) and get one for free.

guardrails\_c { validTopics?: string\[\]; invalidTopics?: string\[\]; }

Restrict input to specific topics using guardrails. @remarks

This feature is only available when using CopilotKit's hosted cloud service. To use this feature, sign up at [https://cloud.copilotkit.ai](https://cloud.copilotkit.ai/) to get your publicApiKey. The feature allows restricting chat conversations to specific topics.

runtimeUrl string

The endpoint for the Copilot Runtime instance. [Click here for more information](https://docs.copilotkit.ai/concepts/copilot-runtime).

transcribeAudioUrl string

The endpoint for the Copilot transcribe audio service.

textToSpeechUrl string

The endpoint for the Copilot text to speech service.

children ReactNode

The children to be rendered within the CopilotKit.

properties Record<string, any>

Custom properties to be sent with the request. Can include threadMetadata for thread creation. For example:

```
{

  'user_id': 'users_id',

  threadMetadata: {

    'account_id': '123',

    'user_type': 'premium'

  }

}
```

agent string

The name of the agent to use.

forwardedParameters Pick<ForwardedParametersInput, 'temperature'>

The forwarded parameters to use for the task.

authConfig\_c { SignInComponent: React.ComponentType<{ onSignInComplete: (authState: AuthState) => void; }>; }

The auth config to use for the CopilotKit. @remarks

This feature is only available when using CopilotKit's hosted cloud service. To use this feature, sign up at [https://cloud.copilotkit.ai](https://cloud.copilotkit.ai/) to get your publicApiKey. The feature allows restricting chat conversations to specific topics.

threadId string

The thread id to use for the CopilotKit.

onError CopilotErrorHandler

Optional error handler for comprehensive debugging and observability.

Requires publicApiKey: Error handling only works when publicApiKey is provided. This is a premium CopilotKit Cloud feature.

@param errorEvent - Structured error event with rich debugging context

@example

```
<CopilotKit

  publicApiKey="ck_pub_your_key"

  onError={(errorEvent) => {

    debugDashboard.capture(errorEvent);

  }}

>
```[Previous](https://docs.copilotkit.ai/reference/components/CopilotTextarea)

[

CopilotTextarea

](https://docs.copilotkit.ai/reference/components/CopilotTextarea)[

Next

useCopilotReadable

](https://docs.copilotkit.ai/reference/hooks/useCopilotReadable)

### On this page

No Headings

![](https://static.scarf.sh/a.png?x-pxid=ffc9f65d-0186-4575-b065-61d62ea9d7d3)