---
inclusion: always
---

# Frontend Architecture & Guidelines

This document outlines the frontend architecture, patterns, and best practices for the CopilotKit + Mastra AI application.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **React**: React 19 with modern hooks and patterns
- **TypeScript**: Strict mode enabled for type safety
- **Styling**: Tailwind CSS 4.x with PostCSS
- **UI Components**: Shadcn UI (built on Radix UI primitives)
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **AI Integration**: CopilotKit for conversational AI interfaces

## Project Structure

```
src/app/
├── api/
│   └── copilotkit/
│       └── route.ts              # CopilotKit API endpoint
├── components/
│   ├── agents/                   # Agent-specific UI components
│   ├── analytics/                # Analytics and metrics components
│   ├── copilotkit/              # CopilotKit wrapper components
│   ├── dev/                     # Development tools components
│   ├── landing/                 # Landing page components
│   ├── layout/                  # Layout and navigation components
│   ├── research/                # Research workspace components
│   ├── researchCanvas/          # Research canvas specific components
│   ├── ui/                      # Base UI components (Shadcn)
│   └── workflows/               # Workflow builder components
├── (pages)/                     # App Router pages
│   ├── about/
│   ├── agents/
│   ├── analytics/
│   ├── dashboard/
│   ├── dev/
│   ├── documentation/
│   ├── research/
│   └── workflows/
├── globals.css                  # Global styles and CSS variables
└── layout.tsx                   # Root layout with providers
```

## Component Architecture

### 1. Component Organization

- **Base UI Components** (`src/app/components/ui/`): Shadcn UI components for consistent design system
- **Feature Components**: Organized by domain (agents, analytics, research, etc.)
- **Layout Components**: Navigation, sidebars, headers, and page layouts
- **Page Components**: Next.js App Router pages

### 2. Component Patterns

#### Functional Components with Hooks
Always use functional components with React hooks. Avoid class components.

```tsx
// ✅ Good
export function AgentDashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  
  useEffect(() => {
    // Side effects here
  }, []);

  return <div>...</div>;
}

// ❌ Avoid
export class AgentDashboard extends Component {
  // Class component pattern
}
```

#### Props Interface Definition
Define clear TypeScript interfaces for component props:

```tsx
interface AgentCardProps {
  agent: Agent;
  onSelect: (agent: Agent) => void;
  isSelected?: boolean;
}

export function AgentCard({ agent, onSelect, isSelected = false }: AgentCardProps) {
  return (
    <Card className={cn("cursor-pointer", isSelected && "ring-2 ring-primary")}>
      {/* Component content */}
    </Card>
  );
}
```

### 3. CopilotKit Integration Patterns

#### Provider Setup
The root layout wraps the application with CopilotKit provider:

```tsx
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <CopilotKit runtimeUrl="/api/copilotkit" agent="masterAgent">
            <TopNavbar />
            {children}
          </CopilotKit>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

#### Using CopilotKit Hooks

**useCopilotAction** - Define actions the AI can call:
```tsx
useCopilotAction({
  name: "updateAgentConfig",
  description: "Update agent configuration settings",
  parameters: [
    {
      name: "agentId",
      type: "string",
      description: "The ID of the agent to update",
    },
    {
      name: "config",
      type: "object",
      description: "The new configuration object",
    },
  ],
  handler: async ({ agentId, config }) => {
    // Handle the action
    await updateAgentConfiguration(agentId, config);
  },
});
```

**useCopilotReadable** - Provide context to the AI:
```tsx
useCopilotReadable({
  description: "Current agent status and metrics",
  value: {
    activeAgents: agents.filter(a => a.status === 'active').length,
    totalRequests: metrics.totalRequests,
    averageResponseTime: metrics.averageResponseTime,
  },
});
```

**useCopilotChat** - For custom chat interfaces:
```tsx
const {
  visibleMessages,
  appendMessage,
  setMessages,
  isLoading,
} = useCopilotChat();
```

## Styling Guidelines

### 1. Tailwind CSS Usage

- Use Tailwind utility classes for styling
- Leverage CSS variables for theme consistency
- Use `cn()` utility for conditional classes

```tsx
import { cn } from "@/lib/utils";

export function Button({ variant = "default", size = "md", className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
        },
        {
          "h-10 px-4 py-2": size === "md",
          "h-9 px-3": size === "sm",
          "h-11 px-8": size === "lg",
        },
        className
      )}
      {...props}
    />
  );
}
```

### 2. CSS Variables and Theming

The application uses CSS variables for consistent theming:

```css
/* globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode variables */
}
```

### 3. Component Styling Patterns

- Use Shadcn UI components as base building blocks
- Extend with custom variants using `class-variance-authority`
- Maintain consistent spacing and typography scales

## State Management

### 1. Local State
Use `useState` for component-local state:

```tsx
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState<FormData>({});
```

### 2. Server State
Use React hooks for server state management:

```tsx
// Custom hook for agent data
function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAgents()
      .then(setAgents)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { agents, loading, error };
}
```

### 3. Global State
Use React Context for global application state:

```tsx
// contexts/AppContext.tsx
const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
}
```

## Performance Optimization

### 1. Code Splitting
Leverage Next.js automatic code splitting and dynamic imports:

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton className="h-32 w-full" />,
});
```

### 2. Image Optimization
Use Next.js Image component for optimized images:

```tsx
import Image from 'next/image';

<Image
  src="/agent-avatar.png"
  alt="Agent Avatar"
  width={64}
  height={64}
  className="rounded-full"
/>
```

### 3. Memoization
Use React.memo and useMemo judiciously:

```tsx
const ExpensiveComponent = memo(function ExpensiveComponent({ data }: Props) {
  const processedData = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);

  return <div>{processedData}</div>;
});
```

## Error Handling

### 1. Error Boundaries
Implement error boundaries for graceful error handling:

```tsx
export function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundaryComponent
      fallback={<ErrorFallback />}
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundaryComponent>
  );
}
```

### 2. Form Validation
Use react-hook-form with zod for form validation:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      {/* Form fields */}
    </Form>
  );
}
```

## Accessibility

### 1. Semantic HTML
Use semantic HTML elements and proper ARIA attributes:

```tsx
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/dashboard" aria-current="page">Dashboard</a></li>
    <li><a href="/agents">Agents</a></li>
  </ul>
</nav>
```

### 2. Keyboard Navigation
Ensure all interactive elements are keyboard accessible:

```tsx
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Action Button
</button>
```

### 3. Screen Reader Support
Provide appropriate labels and descriptions:

```tsx
<input
  type="text"
  id="search"
  aria-label="Search agents"
  aria-describedby="search-help"
/>
<div id="search-help">
  Enter keywords to search for agents
</div>
```

## Testing Guidelines

### 1. Component Testing
Write tests for component behavior and user interactions:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { AgentCard } from './AgentCard';

test('calls onSelect when clicked', () => {
  const mockOnSelect = jest.fn();
  const agent = { id: '1', name: 'Test Agent' };
  
  render(<AgentCard agent={agent} onSelect={mockOnSelect} />);
  
  fireEvent.click(screen.getByText('Test Agent'));
  expect(mockOnSelect).toHaveBeenCalledWith(agent);
});
```

### 2. Integration Testing
Test component integration with CopilotKit:

```tsx
test('provides context to CopilotKit', () => {
  render(
    <CopilotKit runtimeUrl="/api/test">
      <AgentDashboard />
    </CopilotKit>
  );
  
  // Test that context is properly provided
});
```

## Development Workflow

### 1. Component Development
1. Create component in appropriate directory
2. Define TypeScript interfaces
3. Implement component with proper styling
4. Add to index.ts for easy imports
5. Write tests
6. Document usage

### 2. Page Development
1. Create page in app directory
2. Implement layout and components
3. Add proper metadata
4. Test responsive design
5. Verify accessibility

### 3. CopilotKit Integration
1. Define actions and readable context
2. Test AI interactions
3. Implement error handling
4. Document AI capabilities

## Best Practices Summary

1. **Type Safety**: Use TypeScript interfaces and strict mode
2. **Component Composition**: Build reusable, composable components
3. **Performance**: Optimize with memoization and code splitting
4. **Accessibility**: Follow WCAG guidelines
5. **Testing**: Write comprehensive tests for components and interactions
6. **Documentation**: Document component APIs and usage patterns
7. **Consistency**: Follow established patterns and conventions
8. **Error Handling**: Implement graceful error handling and recovery