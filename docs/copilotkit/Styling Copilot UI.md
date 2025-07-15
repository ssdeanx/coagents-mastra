---
title: "Styling Copilot UI"
source: "https://docs.copilotkit.ai/mastra/shared-guides/custom-look-and-feel/customize-built-in-ui-components"
author:
published:
created: 2025-07-15
description:
tags:
  - "clippings"
---
We're officially launching AG-UI, the protocol for agent and user interactivity! [Learn more](https://ag-ui.com/).

CopilotKit has a variety of ways to customize colors and structures of the Copilot UI components.

- [CSS Variables](https://docs.copilotkit.ai/mastra/shared-guides/custom-look-and-feel/#css-variables-easiest)
- [Custom CSS](https://docs.copilotkit.ai/mastra/shared-guides/custom-look-and-feel/#custom-css)
- [Custom Icons](https://docs.copilotkit.ai/mastra/shared-guides/custom-look-and-feel/#custom-icons)
- [Custom Labels](https://docs.copilotkit.ai/mastra/shared-guides/custom-look-and-feel/#custom-labels)

If you want to customize the style as well as the functionality of the Copilot UI, you can also try the following:

- [Custom Sub-Components](https://docs.copilotkit.ai/guides/custom-look-and-feel/bring-your-own-components)
- [Fully Headless UI](https://docs.copilotkit.ai/guides/custom-look-and-feel/headless-ui)

## CSS Variables (Easiest)

The easiest way to change the colors using in the Copilot UI components is to override CopilotKit CSS variables.

Once you've found the right variable, you can import `CopilotKitCSSProperties` and simply wrap CopilotKit in a div and override the CSS variables.

### Reference

| CSS Variable | Description |
| --- | --- |
| `--copilot-kit-primary-color` | Main brand/action color - used for buttons, interactive elements |
| `--copilot-kit-contrast-color` | Color that contrasts with primary - used for text on primary elements |
| `--copilot-kit-background-color` | Main page/container background color |
| `--copilot-kit-secondary-color` | Secondary background - used for cards, panels, elevated surfaces |
| `--copilot-kit-secondary-contrast-color` | Primary text color for main content |
| `--copilot-kit-separator-color` | Border color for dividers and containers |
| `--copilot-kit-muted-color` | Muted color for disabled/inactive states |

## Custom CSS

In addition to customizing the colors, the CopilotKit CSS is structured to easily allow customization via CSS classes.

globals.css

```
.copilotKitButton {

  border-radius: 0;

}

 

.copilotKitMessages {

  padding: 2rem;

}

 

.copilotKitUserMessage {

  background: #007AFF;

}
```

### Reference

| CSS Class | Description |
| --- | --- |
| `.copilotKitMessages` | Main container for all chat messages with scroll behavior and spacing |
| `.copilotKitInput` | Text input container with typing area and send button |
| `.copilotKitUserMessage` | Styling for user messages including background, text color and bubble shape |
| `.copilotKitAssistantMessage` | Styling for AI responses including background, text color and bubble shape |
| `.copilotKitHeader` | Top bar of chat window containing title and controls |
| `.copilotKitButton` | Primary chat toggle button with hover and active states |
| `.copilotKitWindow` | Root container defining overall chat window dimensions and position |
| `.copilotKitMarkdown` | Styles for rendered markdown content including lists, links and quotes |
| `.copilotKitCodeBlock` | Code snippet container with syntax highlighting and copy button |
| `.copilotKitChat` | Base chat layout container handling positioning and dimensions |
| `.copilotKitSidebar` | Styles for sidebar chat mode including width and animations |
| `.copilotKitPopup` | Styles for popup chat mode including position and animations |
| `.copilotKitButtonIcon` | Icon styling within the main chat toggle button |
| `.copilotKitButtonIconOpen``.copilotKitButtonIconClose` | Icon states for when chat is open/closed |
| `.copilotKitCodeBlockToolbar` | Top bar of code blocks with language and copy controls |
| `.copilotKitCodeBlockToolbarLanguage` | Language label styling in code block toolbar |
| `.copilotKitCodeBlockToolbarButtons` | Container for code block action buttons |
| `.copilotKitCodeBlockToolbarButton` | Individual button styling in code block toolbar |
| `.copilotKitSidebarContentWrapper` | Inner container for sidebar mode content |
| `.copilotKitInputControls` | Container for input area buttons and controls |
| `.copilotKitActivityDot1``.copilotKitActivityDot2``.copilotKitActivityDot3` | Animated typing indicator dots |
| `.copilotKitDevConsole` | Development debugging console container |
| `.copilotKitDevConsoleWarnOutdated` | Warning styles for outdated dev console |
| `.copilotKitVersionInfo` | Version information display styles |
| `.copilotKitDebugMenuButton` | Debug menu toggle button styling |
| `.copilotKitDebugMenu` | Debug options menu container |
| `.copilotKitDebugMenuItem` | Individual debug menu option styling |

## Custom Fonts

You can customize the fonts by updating the `fontFamily` property in the various CSS classes that are used in the CopilotKit.

globals.css

```
.copilotKitMessages {

  font-family: "Arial, sans-serif";

}

 

.copilotKitInput {

  font-family: "Arial, sans-serif";

}
```

### Reference

You can update the main content classes to change the font family for the various components.

## Custom Icons

You can customize the icons by passing the `icons` property to the `CopilotSidebar`, `CopilotPopup` or `CopilotChat` component.

```
<CopilotChat

  icons={{

    // Use your own icons here – any React nodes

    openIcon: <YourOpenIconComponent />,

    closeIcon: <YourCloseIconComponent />,

  }}

/>
```

### Reference

To customize labels, pass the `labels` property to the `CopilotSidebar`, `CopilotPopup` or `CopilotChat` component.

```
<CopilotChat

  labels={{

    initial: "Hello! How can I help you today?",

    title: "My Copilot",

    placeholder: "Ask me anything!",

    stopGenerating: "Stop",

    regenerateResponse: "Regenerate",

  }} 

/>
```

### Reference[Previous](https://docs.copilotkit.ai/mastra/shared-guides/custom-look-and-feel/built-in-ui-components)

[

Prebuilt Copilot UI

](https://docs.copilotkit.ai/mastra/shared-guides/custom-look-and-feel/built-in-ui-components)[

Next

Custom Sub-Components

](https://docs.copilotkit.ai/mastra/shared-guides/custom-look-and-feel/bring-your-own-components)

### On this page

No Headings

![](https://static.scarf.sh/a.png?x-pxid=ffc9f65d-0186-4575-b065-61d62ea9d7d3)