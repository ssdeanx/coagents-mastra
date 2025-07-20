"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { PanelGroup as ResizablePanelGroup, Panel as ResizablePanel, PanelResizeHandle as ResizableHandle } from "react-resizable-panels";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { CodeEditor } from "./code-editor";
import { ComponentGenerator } from "./component-generator";
import { FileManager, FileSystemNode } from "./file-manager";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Monitor,
  Code2,
  FileText,
  Terminal as TerminalIcon,
  Layers,
  X,
  Plus,
  FolderOpen,
  Save,
  GitBranch,
  Zap,
  Cpu,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * File Tab Interface
 */
export interface FileTab {
  id: string;
  name: string;
  path: string;
  content: string;
  isDirty: boolean;
  language: string;
  isActive: boolean;
}

/**
 * Project Template Interface
 */
export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  type: 'react' | 'nextjs' | 'node' | 'express' | 'vue' | 'angular';
  files: FileSystemNode[];
  dependencies: string[];
  scripts: Record<string, string>;
  icon: string;
}

/**
 * Terminal Session Interface
 */
export interface TerminalSession {
  id: string;
  name: string;
  terminal: Terminal;
  isActive: boolean;
  cwd: string;
}

/**
 * Dev Workspace Props Interface
 */
export interface DevWorkspaceProps {
  /** Initial project files */
  initialFiles?: FileSystemNode[];
  /** Initial project template */
  initialTemplate?: ProjectTemplate;
  /** Show terminal panel */
  showTerminal?: boolean;
  /** Show component generator */
  showComponentGenerator?: boolean;
  /** Enable project scaffolding */
  enableScaffolding?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Default Project Templates
 */
const DEFAULT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'react-ts',
    name: 'React TypeScript',
    description: 'Modern React application with TypeScript',
    type: 'react',
    icon: '⚛️',
    dependencies: ['react', 'react-dom', '@types/react', '@types/react-dom', 'typescript'],
    scripts: {
      'dev': 'vite dev',
      'build': 'vite build',
      'preview': 'vite preview'
    },
    files: []
  },
  {
    id: 'nextjs-ts',
    name: 'Next.js TypeScript',
    description: 'Full-stack Next.js application with TypeScript',
    type: 'nextjs',
    icon: '▲',
    dependencies: ['next', 'react', 'react-dom', '@types/react', '@types/react-dom', 'typescript'],
    scripts: {
      'dev': 'next dev',
      'build': 'next build',
      'start': 'next start'
    },
    files: []
  },
  {
    id: 'node-express',
    name: 'Node.js Express',
    description: 'Backend API with Express and TypeScript',
    type: 'express',
    icon: '🚀',
    dependencies: ['express', '@types/express', 'typescript', 'ts-node'],
    scripts: {
      'dev': 'ts-node src/index.ts',
      'build': 'tsc',
      'start': 'node dist/index.js'
    },
    files: []
  }
];

/**
 * Integrated Development Environment Component
 */
export const DevWorkspace: React.FC<DevWorkspaceProps> = ({
  initialFiles = [],
  initialTemplate,
  showTerminal = true,
  showComponentGenerator = true,
  enableScaffolding = true,
  className
}) => {
  const [openTabs, setOpenTabs] = useState<FileTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [fileSystem, setFileSystem] = useState<FileSystemNode[]>(initialFiles);
  const [selectedFile, setSelectedFile] = useState<FileSystemNode | null>(null);
  const [terminalSessions, setTerminalSessions] = useState<TerminalSession[]>([]);
  const [activeTerminalId, setActiveTerminalId] = useState<string | null>(null);
  const [currentTemplate, setCurrentTemplate] = useState<ProjectTemplate | null>(initialTemplate || null);
  const [isTerminalVisible, setIsTerminalVisible] = useState(showTerminal);
  const [isComponentGeneratorVisible, setIsComponentGeneratorVisible] = useState(showComponentGenerator);
  const [projectStatus, setProjectStatus] = useState<'idle' | 'running' | 'building' | 'error'>('idle');
  
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  // Memoized active tab
  const activeTab = useMemo(() => {
    return openTabs.find(tab => tab.id === activeTabId) || null;
  }, [openTabs, activeTabId]);

  // Memoized active terminal
  const activeTerminal = useMemo(() => {
    return terminalSessions.find(session => session.id === activeTerminalId) ?? null;
  }, [terminalSessions, activeTerminalId]);

  // Handle file selection from file manager
  const handleFileSelect = useCallback((file: FileSystemNode) => {
    if (file.type !== 'file') {
      return;
    }
    
    setSelectedFile(file);
    
    // Check if file is already open
    const existingTab = openTabs.find(tab => tab.path === file.path);
    if (existingTab) {
      setActiveTabId(existingTab.id);
      return;
    }
    
    // Create new tab
    const newTab: FileTab = {
      id: `tab-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      name: file.name,
      path: file.path,
      content: file.content ?? '',
      isDirty: false,
      language: file.extension === 'tsx' ? 'typescriptreact' : 
                file.extension === 'ts' ? 'typescript' :
                file.extension === 'jsx' ? 'javascriptreact' :
                file.extension === 'js' ? 'javascript' :
                file.extension || 'text',
      isActive: true
    };
    
    setOpenTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
  }, [openTabs]);

  // Handle file content changes
  const handleFileChange = useCallback((file: FileSystemNode, content: string) => {
    // Update the tab content
    setOpenTabs(prev => prev.map(tab => 
      tab.path === file.path 
        ? { ...tab, content, isDirty: tab.content !== content }
        : tab
    ));
    
    // Update file system
    const updateFileContent = (nodes: FileSystemNode[]): FileSystemNode[] => {
      return nodes.map(node => {
        if (node.path === file.path) {
          return { ...node, content, lastModified: new Date() };
        }
        if (node.children) {
          return { ...node, children: updateFileContent(node.children) };
        }
        return node;
      });
    };
    
    setFileSystem(updateFileContent(fileSystem));
  }, [fileSystem]);

  // Handle tab close
  const handleTabClose = useCallback((tabId: string) => {
    const tab = openTabs.find(t => t.id === tabId);
    if (tab?.isDirty) {
      const shouldClose = confirm(`${tab.name} has unsaved changes. Close anyway?`);
      if (!shouldClose) {
        return;
      }
    }
    
    setOpenTabs(prev => prev.filter(t => t.id !== tabId));
    
    if (activeTabId === tabId) {
      const remainingTabs = openTabs.filter(t => t.id !== tabId);
      setActiveTabId(remainingTabs.length > 0 ? remainingTabs[remainingTabs.length - 1].id : null);
    }
  }, [openTabs, activeTabId]);

  // Handle code changes in editor
  const handleCodeChange = useCallback((newCode: string) => {
    if (!activeTab) {
      return;
    }
    
    setOpenTabs(prev => prev.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, content: newCode, isDirty: tab.content !== newCode }
        : tab
    ));
  }, [activeTab, activeTabId]);

  // Handle file save
  const handleFileSave = useCallback(() => {
    if (!activeTab) {
      return;
    }
    
    // Update file system with saved content
    const updateFileContent = (nodes: FileSystemNode[]): FileSystemNode[] => {
      return nodes.map(node => {
        if (node.path === activeTab.path) {
          return { ...node, content: activeTab.content, lastModified: new Date() };
        }
        if (node.children) {
          return { ...node, children: updateFileContent(node.children) };
        }
        return node;
      });
    };
    
    setFileSystem(updateFileContent(fileSystem));
    
    // Mark tab as clean
    setOpenTabs(prev => prev.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, isDirty: false }
        : tab
    ));
  }, [activeTab, activeTabId, fileSystem]);

  // Handle terminal commands
  const handleTerminalCommand = useCallback((command: string, terminal: Terminal) => {
    const args = command.split(' ');
    const cmd = args[0];

    switch (cmd) {
      case 'help':
        terminal.writeln('Available commands:');
        terminal.writeln('  help     - Show this help message');
        terminal.writeln('  ls       - List files');
        terminal.writeln('  pwd      - Print working directory');
        terminal.writeln('  clear    - Clear terminal');
        terminal.writeln('  npm      - Run npm commands');
        terminal.writeln('  git      - Git commands');
        break;
      case 'ls':
        terminal.writeln('src/  package.json  README.md  node_modules/');
        break;
      case 'pwd':
        terminal.writeln('/workspace');
        break;
      case 'clear':
        terminal.clear();
        break;
      case 'npm':
        if (args[1] === 'install') {
          terminal.writeln('Installing dependencies...');
          setProjectStatus('building');
          setTimeout(() => {
            terminal.writeln('Dependencies installed successfully!');
            setProjectStatus('idle');
          }, 2000);
        } else if (args[1] === 'run' && args[2] === 'dev') {
          terminal.writeln('Starting development server...');
          setProjectStatus('running');
          terminal.writeln('Server running on http://localhost:3000');
        } else {
          terminal.writeln(`npm ${args.slice(1).join(' ')}`);
        }
        break;
      case 'git':
        if (args[1] === 'status') {
          terminal.writeln('On branch main');
          terminal.writeln('Your branch is up to date with "origin/main".');
          terminal.writeln('');
          terminal.writeln('Changes not staged for commit:');
          openTabs.filter(tab => tab.isDirty).forEach(tab => {
            terminal.writeln(`  modified:   ${tab.path}`);
          });
        } else {
          terminal.writeln(`git ${args.slice(1).join(' ')}`);
        }
        break;
      default:
        terminal.writeln(`Command not found: ${cmd}`);
        break;
    }
  }, [openTabs]);

  // Create new terminal session
  const createTerminalSession = useCallback(() => {
    const terminal = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#ffffff',
        selectionBackground: '#264f78'
      }
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    fitAddonRef.current = fitAddon;

    const sessionId = `terminal-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    const session: TerminalSession = {
      id: sessionId,
      name: `Terminal ${terminalSessions.length + 1}`,
      terminal,
      isActive: true,
      cwd: '/'
    };

    // Basic terminal simulation
    terminal.writeln('Welcome to Dev Workspace Terminal');
    terminal.writeln('Type "help" for available commands');
    terminal.write('$ ');

    let currentLine = '';
    terminal.onData((data) => {
      if (data === '\r') {
        // Enter key
        terminal.writeln('');
        if (currentLine.trim()) {
          handleTerminalCommand(currentLine.trim(), terminal);
        }
        currentLine = '';
        terminal.write('$ ');
      } else if (data === '\u007f') {
        // Backspace
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          terminal.write('\b \b');
        }
      } else {
        currentLine += data;
        terminal.write(data);
      }
    });

    setTerminalSessions(prev => [...prev, session]);
    setActiveTerminalId(sessionId);

    return session;
  }, [terminalSessions, handleTerminalCommand]);

  // Initialize terminal when component mounts
  useEffect(() => {
    if (showTerminal && terminalSessions.length === 0) {
      createTerminalSession();
    }
  }, [showTerminal, terminalSessions.length, createTerminalSession]);

  // Fit terminal when container size changes
  useEffect(() => {
    if (activeTerminal && terminalContainerRef.current && fitAddonRef.current) {
      const container = terminalContainerRef.current;
      if (container.offsetWidth > 0 && container.offsetHeight > 0) {
        try {
          fitAddonRef.current.fit();
        } catch (error) {
          console.warn('Failed to fit terminal:', error);
        }
      }
    }
  }, [activeTerminal, isTerminalVisible]);

  // Mount terminal to DOM
  useEffect(() => {
    if (activeTerminal && terminalContainerRef.current) {
      activeTerminal.terminal.open(terminalContainerRef.current);
      if (fitAddonRef.current) {
        setTimeout(() => {
          try {
            fitAddonRef.current?.fit();
          } catch (error) {
            console.warn('Failed to fit terminal on mount:', error);
          }
        }, 100);
      }
    }

    return () => {
      if (activeTerminal) {
        activeTerminal.terminal.dispose();
      }
    };
  }, [activeTerminal]);

  // Handle project scaffolding
  const handleCreateProject = useCallback((template: ProjectTemplate) => {
    setCurrentTemplate(template);
    setProjectStatus('building');

    // Simulate project creation
    setTimeout(() => {
      // In production, this would create actual project files
      setProjectStatus('idle');

      if (activeTerminal) {
        activeTerminal.terminal.writeln(`Created new ${template.name} project`);
        activeTerminal.terminal.writeln('Run "npm install" to install dependencies');
        activeTerminal.terminal.write('$ ');
      }
    }, 1500);
  }, [activeTerminal]);

  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      {/* Top Toolbar */}
      <Card className="glass mb-2">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                <span className="font-semibold">Dev Workspace</span>
                {currentTemplate && (
                  <Badge variant="outline" className="text-xs">
                    <span className="mr-1">{currentTemplate.icon}</span>
                    {currentTemplate.name}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={projectStatus === 'running' ? 'default' :
                          projectStatus === 'building' ? 'secondary' :
                          projectStatus === 'error' ? 'destructive' : 'outline'}
                  className="text-xs"
                >
                  {projectStatus === 'running' && <Activity className="h-3 w-3 mr-1 animate-pulse" />}
                  {projectStatus === 'building' && <Cpu className="h-3 w-3 mr-1 animate-spin" />}
                  {projectStatus.charAt(0).toUpperCase() + projectStatus.slice(1)}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {enableScaffolding && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Project
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {DEFAULT_TEMPLATES.map(template => (
                      <DropdownMenuItem
                        key={template.id}
                        onClick={() => handleCreateProject(template)}
                      >
                        <span className="mr-2">{template.icon}</span>
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-xs text-muted-foreground">{template.description}</div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => { setIsTerminalVisible(!isTerminalVisible); }}
                    >
                      <TerminalIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isTerminalVisible ? 'Hide' : 'Show'} Terminal</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => { setIsComponentGeneratorVisible(!isComponentGeneratorVisible); }}
                    >
                      <Layers className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isComponentGeneratorVisible ? 'Hide' : 'Show'} Component Generator</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* File Tabs */}
      {openTabs.length > 0 && (
        <div className="flex items-center gap-1 mb-2 overflow-x-auto">
          {openTabs.map(tab => (
            <div
              key={tab.id}
              className={cn(
                "flex items-center gap-2 px-3 py-1 text-sm rounded-t-md cursor-pointer transition-colors",
                tab.id === activeTabId
                  ? "bg-background border border-b-0"
                  : "bg-muted hover:bg-muted/80"
              )}
              onClick={() => { setActiveTabId(tab.id); }}
            >
              <FileText className="h-3 w-3" />
              <span className="truncate max-w-32">{tab.name}</span>
              {tab.isDirty && <div className="w-1 h-1 bg-orange-500 rounded-full" />}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTabClose(tab.id);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main Layout */}
      <div className="flex-1 min-h-0">
        <ResizablePanelGroup direction="horizontal">
          {/* File Explorer */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
            <Card className="h-full glass">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <FolderOpen className="h-4 w-4" />
                  Explorer
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-4rem)]">
                <FileManager
                  initialFiles={fileSystem}
                  onFileSelect={handleFileSelect}
                  onFileChange={handleFileChange}
                  showSearch={true}
                  showToolbar={false}
                  className="h-full"
                />
              </CardContent>
            </Card>
          </ResizablePanel>

          <ResizableHandle />

          {/* Main Editor Area */}
          <ResizablePanel defaultSize={isComponentGeneratorVisible ? 50 : 80} minSize={30}>
            <ResizablePanelGroup direction="vertical">
              {/* Code Editor */}
              <ResizablePanel defaultSize={isTerminalVisible ? 70 : 100} minSize={30}>
                <Card className="h-full glass">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4" />
                        <span>Editor</span>
                        {activeTab && (
                          <Badge variant="outline" className="text-xs">
                            {activeTab.language}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleFileSave}
                                disabled={!activeTab?.isDirty}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Save (Ctrl+S)</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 h-[calc(100%-4rem)]">
                    {activeTab ? (
                      <CodeEditor
                        value={activeTab.content}
                        language={activeTab.language as any}
                        theme="vs-dark"
                        onChange={handleCodeChange}
                        onSave={handleFileSave}
                        fileName={activeTab.name}
                        showToolbar={false}
                        height="100%"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <div className="text-center">
                          <Code2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium mb-2">Welcome to Dev Workspace</p>
                          <p className="text-sm">Select a file from the explorer to start editing</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </ResizablePanel>

              {/* Terminal */}
              {isTerminalVisible && (
                <>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                    <Card className="h-full glass">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <TerminalIcon className="h-4 w-4" />
                            <span>Terminal</span>
                            {activeTerminal && (
                              <Badge variant="outline" className="text-xs">
                                {activeTerminal.name}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={createTerminalSession}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>New Terminal</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 h-[calc(100%-4rem)]">
                        <div
                          ref={terminalContainerRef}
                          className="h-full w-full bg-[#1e1e1e] rounded-b-lg"
                        />
                      </CardContent>
                    </Card>
                  </ResizablePanel>
                </>
              )}
            </ResizablePanelGroup>
          </ResizablePanel>

          {/* Component Generator */}
          {isComponentGeneratorVisible && (
            <>
              <ResizableHandle />
              <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
                <Card className="h-full glass">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Layers className="h-4 w-4" />
                      Component Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 h-[calc(100%-4rem)]">
                    <ComponentGenerator
                      onComponentGenerated={(component) => {
                        // Handle generated component
                        console.log('Generated component:', component);
                      }}
                      mode="playground"
                      showTemplates={true}
                      showPropEditor={true}
                      className="h-full"
                    />
                  </CardContent>
                </Card>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-t text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <GitBranch className="h-3 w-3" />
            <span>main</span>
          </div>
          {activeTab && (
            <div className="flex items-center gap-2">
              <span>{activeTab.path}</span>
              {activeTab.isDirty && <span className="text-orange-500">●</span>}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span>{openTabs.length} files open</span>
          {selectedFile && (
            <span>Selected: {selectedFile.name}</span>
          )}
          <span>TypeScript</span>
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            <span>Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevWorkspace;
