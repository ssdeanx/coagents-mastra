/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useCallback, useEffect, useMemo, ErrorInfo } from "react";
import { PanelGroup as ResizablePanelGroup, Panel as ResizablePanel, PanelResizeHandle as ResizableHandle } from "react-resizable-panels";
import { CodeEditor } from "./code-editor";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";
import { Separator } from "@/app/components/ui/separator";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import {
  Download,
  Sparkles,
  Layers,
  Settings,
  Eye,
  Code2,
  FileText,
  AlertTriangle,
  CheckCircle,
  Copy,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Component Generator Props Interface
 */
export interface ComponentGeneratorProps {
  /** Callback when component is generated */
  onComponentGenerated?: (component: GeneratedComponent) => void;
  /** Available component templates */
  templates?: ComponentTemplate[];
  /** AI generation agent */
  generationAgent?: any;
  /** Initial component code */
  initialCode?: string;
  /** Component generator mode */
  mode?: 'generator' | 'editor' | 'playground';
  /** Show template library */
  showTemplates?: boolean;
  /** Show prop editor */
  showPropEditor?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Generated Component Interface
 */
export interface GeneratedComponent {
  id: string;
  name: string;
  code: string;
  props: ComponentProp[];
  dependencies: string[];
  preview: React.ReactNode;
  documentation: string;
  tests?: string;
  category: ComponentCategory;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Component Template Interface
 */
export interface ComponentTemplate {
  id: string;
  name: string;
  description: string;
  category: ComponentCategory;
  baseCode: string;
  configurableProps: TemplateProp[];
  preview: string;
  dependencies: string[];
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
}

/**
 * Component Property Interface
 */
export interface ComponentProp {
  name: string;
  type: PropType;
  required: boolean;
  defaultValue?: any;
  description: string;
  validation?: ValidationRule[];
  options?: string[];
}

/**
 * Template Property Interface
 */
export interface TemplateProp {
  name: string;
  type: PropType;
  defaultValue?: any;
  options?: string[];
  description?: string;
  required?: boolean;
}

/**
 * Validation Rule Interface
 */
export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

/**
 * Component Categories
 */
export type ComponentCategory =
  | 'form'
  | 'layout'
  | 'data-display'
  | 'navigation'
  | 'feedback'
  | 'input'
  | 'media'
  | 'overlay'
  | 'utility';

/**
 * Property Types
 */
export type PropType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array'
  | 'function'
  | 'node'
  | 'element';

/**
 * Error Boundary for Component Preview
 */
class ComponentPreviewErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (error: Error, errorInfo: ErrorInfo) => void },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; onError: (error: Error, errorInfo: ErrorInfo) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="font-medium text-destructive">Component Error</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {this.state.error?.message || 'An error occurred while rendering the component'}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Default Component Templates
 */
const DEFAULT_TEMPLATES: ComponentTemplate[] = [
  {
    id: 'button-template',
    name: 'Button Component',
    description: 'A customizable button component with variants and sizes',
    category: 'input',
    difficulty: 'beginner',
    icon: '🔘',
    tags: ['button', 'interactive', 'form'],
    dependencies: ['@/lib/utils'],
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMDA3Y2ZmIiByeD0iNCIvPjx0ZXh0IHg9IjUwIiB5PSIyNSIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJ1dHRvbjwvdGV4dD48L3N2Zz4=',
    baseCode: `import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  className,
  onClick,
  disabled = false
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === 'default',
          "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === 'destructive',
          "border border-input hover:bg-accent hover:text-accent-foreground": variant === 'outline',
          "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === 'secondary',
          "hover:bg-accent hover:text-accent-foreground": variant === 'ghost',
          "underline-offset-4 hover:underline text-primary": variant === 'link',
          "h-10 py-2 px-4": size === 'default',
          "h-9 px-3 rounded-md": size === 'sm',
          "h-11 px-8 rounded-md": size === 'lg',
          "h-10 w-10": size === 'icon'
        },
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;`,
    configurableProps: [
      { name: 'variant', type: 'string', options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'], defaultValue: 'default' },
      { name: 'size', type: 'string', options: ['default', 'sm', 'lg', 'icon'], defaultValue: 'default' },
      { name: 'disabled', type: 'boolean', defaultValue: false }
    ]
  },
  {
    id: 'card-template',
    name: 'Card Component',
    description: 'A flexible card component for displaying content',
    category: 'layout',
    difficulty: 'beginner',
    icon: '🃏',
    tags: ['card', 'container', 'layout'],
    dependencies: ['@/lib/utils'],
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZjlmOWY5IiBzdHJva2U9IiNlMGUwZTAiIHJ4PSI0Ii8+PHRleHQgeD0iNTAiIHk9IjQ1IiBmaWxsPSIjMzMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DYXJkPC90ZXh0Pjwvc3ZnPg==',
    baseCode: `import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  title,
  description,
  footer
}) => {
  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      {(title || description) && (
        <div className="flex flex-col space-y-1.5 p-6">
          {title && <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="p-6 pt-0">{children}</div>
      {footer && <div className="flex items-center p-6 pt-0">{footer}</div>}
    </div>
  );
};

export default Card;`,
    configurableProps: [
      { name: 'title', type: 'string', defaultValue: 'Card Title' },
      { name: 'description', type: 'string', defaultValue: 'Card description goes here' }
    ]
  }
];

/**
 * Component Generator Main Component
 */
export const ComponentGenerator: React.FC<ComponentGeneratorProps> = ({
  onComponentGenerated,
  templates = DEFAULT_TEMPLATES,
  generationAgent,
  initialCode,
  mode = 'generator',
  showTemplates = true,
  showPropEditor = true,
  className
}) => {
  const [componentCode, setComponentCode] = useState<string>(
    initialCode || `import React from 'react';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  children?: React.ReactNode;
  className?: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ children, className }) => {
  return (
    <div className={cn("p-4 border rounded-lg", className)}>
      {children || "Hello, World!"}
    </div>
  );
};

export default MyComponent;`
  );

  const [previewComponent, setPreviewComponent] = useState<React.ReactNode>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ComponentTemplate | null>(null);
  const [componentProps, setComponentProps] = useState<Record<string, any>>({});
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('code');
  const [componentName, setComponentName] = useState('MyComponent');

  // Memoized template categories for performance
  const templateCategories = useMemo(() => {
    const categories = new Set(templates.map(t => t.category));
    return Array.from(categories);
  }, [templates]);

  // Handle code changes with live preview update
  const handleCodeChange = useCallback((newCode: string) => {
    setComponentCode(newCode);
    setPreviewError(null);

    // Simple preview update - in production, this would use a secure sandbox
    try {
      setPreviewComponent(
        <div className="p-4 bg-background border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Component Preview</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Live preview of your component will appear here
          </div>
        </div>
      );
    } catch (error) {
      setPreviewError(error instanceof Error ? error.message : 'Unknown error');
      setPreviewComponent(
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="font-medium text-destructive">Preview Error</span>
          </div>
          <p className="text-sm text-muted-foreground">{previewError}</p>
        </div>
      );
    }
  }, [previewError]);

  // Handle template selection
  const handleTemplateSelect = useCallback((template: ComponentTemplate) => {
    setSelectedTemplate(template);
    setComponentCode(template.baseCode);
    setComponentName(template.name.replace(/\s+/g, ''));

    // Initialize props with default values
    const initialProps: Record<string, any> = {};
    template.configurableProps.forEach(prop => {
      initialProps[prop.name] = prop.defaultValue;
    });
    setComponentProps(initialProps);
  }, []);

  // Handle component generation with AI
  const handleGenerateComponent = useCallback(async () => {
    if (!generationAgent) {
      alert('AI generation not available - generationAgent not provided');
      return;
    }

    setIsGenerating(true);
    try {
      // In production, this would call the actual AI agent
      const generated: GeneratedComponent = {
        id: `comp-${Date.now()}`,
        name: componentName,
        code: componentCode,
        props: Object.entries(componentProps).map(([name, value]) => ({
          name,
          type: typeof value as PropType,
          required: false,
          defaultValue: value,
          description: `Generated prop: ${name}`
        })),
        dependencies: ['@/lib/utils'],
        preview: previewComponent,
        documentation: `AI-generated ${componentName} component.`,
        category: selectedTemplate?.category || 'utility',
        tags: selectedTemplate?.tags || [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      onComponentGenerated?.(generated);
    } catch (error) {
      setPreviewError(error instanceof Error ? error.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  }, [generationAgent, componentName, componentCode, componentProps, previewComponent, selectedTemplate, onComponentGenerated]);

  // Handle prop value changes
  const handlePropChange = useCallback((propName: string, value: any) => {
    setComponentProps(prev => ({ ...prev, [propName]: value }));
  }, []);

  // Handle error boundary errors
  const handlePreviewError = useCallback((error: Error, errorInfo: ErrorInfo) => {
    console.error('Component preview error:', error, errorInfo);
    setPreviewError(error.message);
  }, []);

  // Copy component code to clipboard
  const handleCopyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(componentCode);
      // In production, show a toast notification
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  }, [componentCode]);

  // Reset component to default state
  const handleReset = useCallback(() => {
    setComponentCode(initialCode || '');
    setSelectedTemplate(null);
    setComponentProps({});
    setPreviewError(null);
    setComponentName('MyComponent');
    setActiveTab('code');
  }, [initialCode]);

  // Initialize preview on mount
  useEffect(() => {
    handleCodeChange(componentCode);
  }, [componentCode, handleCodeChange]);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header */}
      <Card className="glass mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              <span>Component Generator</span>
              {selectedTemplate && (
                <Badge variant="secondary" className="text-xs">
                  {selectedTemplate.name}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={handleCopyCode}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy code</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <div className="flex-1 min-h-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className={cn(
            "grid w-full",
            mode === 'editor' ? "grid-cols-1" : mode === 'playground' ? "grid-cols-2" : "grid-cols-3"
          )}>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Code Editor
            </TabsTrigger>
            {mode !== 'editor' && (
              <TabsTrigger value="templates" className="flex items-center gap-2" disabled={!showTemplates}>
                <FileText className="h-4 w-4" />
                Templates
              </TabsTrigger>
            )}
            {mode === 'generator' && (
              <TabsTrigger value="props" className="flex items-center gap-2" disabled={!showPropEditor}>
                <Settings className="h-4 w-4" />
                Props Editor
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="code" className="flex-1 mt-4">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel defaultSize={60} minSize={30}>
                <Card className="h-full glass">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Code2 className="h-4 w-4" />
                      Component Code
                      <Badge variant="outline" className="text-xs">
                        {componentName}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[calc(100%-4rem)] p-0">
                    <CodeEditor
                      value={componentCode}
                      language="typescriptreact"
                      theme="vs-dark"
                      onChange={handleCodeChange}
                      onSave={handleCopyCode}
                      fileName={`${componentName}.tsx`}
                      showToolbar={false}
                      height="100%"
                    />
                  </CardContent>
                </Card>
              </ResizablePanel>

              <ResizableHandle />

              <ResizablePanel defaultSize={40} minSize={30}>
                <Card className="h-full glass">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Live Preview
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleGenerateComponent}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Sparkles className="h-4 w-4" />
                          )}
                          {isGenerating ? 'Generating...' : 'AI Generate'}
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[calc(100%-4rem)]">
                    <div className="h-full border rounded-lg bg-background p-4 overflow-auto">
                      <ComponentPreviewErrorBoundary onError={handlePreviewError}>
                        {previewComponent || (
                          <div className="flex items-center justify-center h-full text-muted-foreground">
                            <div className="text-center">
                              <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">Component preview will appear here</p>
                            </div>
                          </div>
                        )}
                      </ComponentPreviewErrorBoundary>
                    </div>
                  </CardContent>
                </Card>
              </ResizablePanel>
            </ResizablePanelGroup>
          </TabsContent>

          <TabsContent value="templates" className="flex-1 mt-4">
            <Card className="h-full glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Component Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Label htmlFor="category-filter">Filter by Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {templateCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <ScrollArea className="h-[400px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates.map(template => (
                      <Card
                        key={template.id}
                        className={cn(
                          "cursor-pointer transition-colors hover:bg-accent",
                          selectedTemplate?.id === template.id && "ring-2 ring-primary"
                        )}
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center gap-2 text-sm">
                            <span className="text-lg">{template.icon}</span>
                            {template.name}
                            <Badge variant="outline" className="text-xs">
                              {template.difficulty}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground mb-2">
                            {template.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {template.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="props" className="flex-1 mt-4">
            <Card className="h-full glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Props Editor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="component-name">Component Name</Label>
                    <Input
                      id="component-name"
                      value={componentName}
                      onChange={(e) => setComponentName(e.target.value)}
                      placeholder="MyComponent"
                    />
                  </div>

                  {selectedTemplate && (
                    <div className="space-y-4">
                      <Separator />
                      <h4 className="font-medium">Template Props</h4>
                      {selectedTemplate.configurableProps.map(prop => (
                        <div key={prop.name} className="space-y-2">
                          <Label htmlFor={prop.name}>{prop.name}</Label>
                          {prop.type === 'boolean' ? (
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={prop.name}
                                checked={componentProps[prop.name] || false}
                                onCheckedChange={(checked) => handlePropChange(prop.name, checked)}
                              />
                              <Label htmlFor={prop.name} className="text-sm text-muted-foreground">
                                {componentProps[prop.name] ? 'true' : 'false'}
                              </Label>
                            </div>
                          ) : prop.options ? (
                            <Select
                              value={componentProps[prop.name] || prop.defaultValue}
                              onValueChange={(value) => handlePropChange(prop.name, value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {prop.options.map(option => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : prop.type === 'string' ? (
                            <Textarea
                              id={prop.name}
                              value={componentProps[prop.name] || prop.defaultValue || ''}
                              onChange={(e) => handlePropChange(prop.name, e.target.value)}
                              placeholder={`Enter ${prop.name}`}
                              rows={2}
                            />
                          ) : (
                            <Input
                              id={prop.name}
                              type={prop.type === 'number' ? 'number' : 'text'}
                              value={componentProps[prop.name] || prop.defaultValue || ''}
                              onChange={(e) => handlePropChange(prop.name,
                                prop.type === 'number' ? Number(e.target.value) : e.target.value
                              )}
                              placeholder={`Enter ${prop.name}`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <Separator />

                  <div className="flex gap-2">
                    <Button onClick={handleGenerateComponent} disabled={isGenerating} className="flex-1">
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate Component
                        </>
                      )}
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Export Component</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will download the component code as a TypeScript file.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleCopyCode}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComponentGenerator;
