"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useCallback, useMemo } from "react";
import { useCopilotAction } from "@copilotkit/react-core";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/app/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,

} from "@/app/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import {
  Folder,
  FolderOpen,
  File,
  FileText,
  FileCode,
  FileImage,
  FileVideo,
  FileAudio,
  Search,
  Edit,
  Trash2,
  Copy,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  FolderPlus,
  FilePlus
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * File System Node Types
 */
export type FileSystemNodeType = 'file' | 'directory';

/**
 * File System Node Interface
 */
export interface FileSystemNode {
  id: string;
  name: string;
  type: FileSystemNodeType;
  path: string;
  parentId?: string;
  size?: number;
  lastModified: Date;
  content?: string;
  children?: FileSystemNode[];
  isExpanded?: boolean;
  isSelected?: boolean;
  extension?: string;
  mimeType?: string;
}

/**
 * File Operation Types
 */
export type FileOperation = 'create' | 'read' | 'update' | 'delete' | 'rename' | 'move' | 'copy';

/**
 * File Manager Props Interface
 */
export interface FileManagerProps {
  /** Initial file system structure */
  initialFiles?: FileSystemNode[];
  /** Callback when file is selected */
  onFileSelect?: (file: FileSystemNode) => void;
  /** Callback when file content changes */
  onFileChange?: (file: FileSystemNode, content: string) => void;
  /** Callback when file operation is performed */
  onFileOperation?: (operation: FileOperation, file: FileSystemNode, data?: any) => void;
  /** Show search functionality */
  showSearch?: boolean;
  /** Show file operations toolbar */
  showToolbar?: boolean;
  /** Enable drag and drop */
  enableDragDrop?: boolean;
  /** Maximum file size in bytes */
  maxFileSize?: number;
  /** Allowed file extensions */
  allowedExtensions?: string[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * File Type Icons Mapping
 */
const FILE_TYPE_ICONS = {
  // Code files
  'ts': FileCode,
  'tsx': FileCode,
  'js': FileCode,
  'jsx': FileCode,
  'json': FileCode,
  'yaml': FileCode,
  'yml': FileCode,
  'css': FileCode,
  'scss': FileCode,
  'html': FileCode,
  'xml': FileCode,
  'sql': FileCode,
  // Text files
  'txt': FileText,
  'md': FileText,
  'mdx': FileText,
  'log': FileText,
  // Media files
  'png': FileImage,
  'jpg': FileImage,
  'jpeg': FileImage,
  'gif': FileImage,
  'svg': FileImage,
  'mp4': FileVideo,
  'avi': FileVideo,
  'mov': FileVideo,
  'mp3': FileAudio,
  'wav': FileAudio,
  'flac': FileAudio,
  // Default
  'default': File
} as const;

/**
 * Default File System Structure
 */
const DEFAULT_FILE_SYSTEM: FileSystemNode[] = [
  {
    id: 'root',
    name: 'project',
    type: 'directory',
    path: '/',
    lastModified: new Date(),
    isExpanded: true,
    children: [
      {
        id: 'src',
        name: 'src',
        type: 'directory',
        path: '/src',
        parentId: 'root',
        lastModified: new Date(),
        isExpanded: true,
        children: [
          {
            id: 'components',
            name: 'components',
            type: 'directory',
            path: '/src/components',
            parentId: 'src',
            lastModified: new Date(),
            children: [
              {
                id: 'button-tsx',
                name: 'Button.tsx',
                type: 'file',
                path: '/src/components/Button.tsx',
                parentId: 'components',
                lastModified: new Date(),
                extension: 'tsx',
                mimeType: 'text/typescript',
                size: 1024,
                content: `import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded">
      {children}
    </button>
  );
};

export default Button;`
              }
            ]
          },
          {
            id: 'utils',
            name: 'utils',
            type: 'directory',
            path: '/src/utils',
            parentId: 'src',
            lastModified: new Date(),
            children: [
              {
                id: 'helpers-ts',
                name: 'helpers.ts',
                type: 'file',
                path: '/src/utils/helpers.ts',
                parentId: 'utils',
                lastModified: new Date(),
                extension: 'ts',
                mimeType: 'text/typescript',
                size: 512,
                content: `export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};`
              }
            ]
          }
        ]
      },
      {
        id: 'package-json',
        name: 'package.json',
        type: 'file',
        path: '/package.json',
        parentId: 'root',
        lastModified: new Date(),
        extension: 'json',
        mimeType: 'application/json',
        size: 2048,
        content: `{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample project",
  "main": "index.js",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "react": "^18.0.0",
    "next": "^14.0.0"
  }
}`
      },
      {
        id: 'readme-md',
        name: 'README.md',
        type: 'file',
        path: '/README.md',
        parentId: 'root',
        lastModified: new Date(),
        extension: 'md',
        mimeType: 'text/markdown',
        size: 1536,
        content: `# My Project

This is a sample project created with the File Manager component.

## Features

- File management
- Code editing
- Component generation

## Getting Started

1. Install dependencies: \`npm install\`
2. Start development server: \`npm run dev\`
3. Open [http://localhost:3000](http://localhost:3000)
`
      }
    ]
  }
];

/**
 * File Manager Component
 */
export const FileManager: React.FC<FileManagerProps> = ({
  initialFiles = DEFAULT_FILE_SYSTEM,
  onFileSelect,
  onFileChange,
  onFileOperation,
  showSearch = true,
  showToolbar = true,
  enableDragDrop = true,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  allowedExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'yaml', 'yml', 'css', 'scss', 'html', 'md', 'txt'],
  className
}) => {
  const [fileSystem, setFileSystem] = useState<FileSystemNode[]>(initialFiles);
  const [selectedFile, setSelectedFile] = useState<FileSystemNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [createType, setCreateType] = useState<FileSystemNodeType>('file');
  const [newItemName, setNewItemName] = useState('');
  const [contextMenuFile, setContextMenuFile] = useState<FileSystemNode | null>(null);
  const [draggedFile, setDraggedFile] = useState<FileSystemNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Flatten file system for search
  const flattenedFiles = useMemo(() => {
    const flatten = (nodes: FileSystemNode[]): FileSystemNode[] => {
      return nodes.reduce((acc, node) => {
        acc.push(node);
        if (node.children) {
          acc.push(...flatten(node.children));
        }
        return acc;
      }, [] as FileSystemNode[]);
    };
    return flatten(fileSystem);
  }, [fileSystem]);

  // Filtered files based on search query
  const filteredFiles = useMemo(() => {
    if (!searchQuery.trim()) {
      return fileSystem;
    }

    const filtered = flattenedFiles.filter(file =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.path.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Build tree structure from filtered results
    const buildTree = (files: FileSystemNode[]): FileSystemNode[] => {
      const fileMap = new Map<string, FileSystemNode>();
      const roots: FileSystemNode[] = [];

      files.forEach(file => {
        fileMap.set(file.id, { ...file, children: [] });
      });

      files.forEach(file => {
        const node = fileMap.get(file.id)!;
        if (file.parentId && fileMap.has(file.parentId)) {
          const parent = fileMap.get(file.parentId)!;
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(node);
        } else {
          roots.push(node);
        }
      });

      return roots;
    };

    return buildTree(filtered);
  }, [fileSystem, searchQuery, flattenedFiles]);

  // Get file icon based on extension
  const getFileIcon = useCallback((file: FileSystemNode) => {
    if (file.type === 'directory') {
      return file.isExpanded ? FolderOpen : Folder;
    }

    const extension = file.extension || file.name.split('.').pop()?.toLowerCase();
    const IconComponent = extension ? FILE_TYPE_ICONS[extension as keyof typeof FILE_TYPE_ICONS] : FILE_TYPE_ICONS.default;
    return IconComponent || FILE_TYPE_ICONS.default;
  }, []);

  // Handle file selection
  const handleFileSelect = useCallback((file: FileSystemNode) => {
    setSelectedFile(file);
    onFileSelect?.(file);
  }, [onFileSelect]);

  // Handle directory toggle
  const handleDirectoryToggle = useCallback((file: FileSystemNode) => {
    if (file.type !== 'directory') {
      return;
    }

    const updateNode = (nodes: FileSystemNode[]): FileSystemNode[] => {
      return nodes.map(node => {
        if (node.id === file.id) {
          return { ...node, isExpanded: !node.isExpanded };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };

    setFileSystem(updateNode(fileSystem));
  }, [fileSystem]);

  // Handle file creation
  const handleCreateFile = useCallback(async (name: string, type: FileSystemNodeType, parentId?: string) => {
    if (!name.trim()) {
      return;
    }

    // Validate file extension and size if it's a file
    if (type === 'file') {
      const extension = name.split('.').pop()?.toLowerCase();
      if (extension && !allowedExtensions.includes(extension)) {
        alert(`File extension .${extension} is not allowed. Allowed extensions: ${allowedExtensions.join(', ')}`);
        return;
      }

      // Check file size (simulated for new files)
      const estimatedSize = name.length * 100; // Rough estimate
      if (estimatedSize > maxFileSize) {
        alert(`File size would exceed maximum allowed size of ${(maxFileSize / 1024 / 1024).toFixed(1)}MB`);
        return;
      }
    }

    setIsLoading(true);
    try {
      const newFile: FileSystemNode = {
        id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: name.trim(),
        type,
        path: parentId ? `${flattenedFiles.find(f => f.id === parentId)?.path}/${name.trim()}` : `/${name.trim()}`,
        parentId,
        lastModified: new Date(),
        size: type === 'file' ? 0 : undefined,
        content: type === 'file' ? '' : undefined,
        children: type === 'directory' ? [] : undefined,
        isExpanded: type === 'directory' ? false : undefined,
        extension: type === 'file' ? name.split('.').pop()?.toLowerCase() : undefined,
        mimeType: type === 'file' ? 'text/plain' : undefined
      };

      const addToTree = (nodes: FileSystemNode[]): FileSystemNode[] => {
        if (!parentId) {
          return [...nodes, newFile];
        }

        return nodes.map(node => {
          if (node.id === parentId) {
            return {
              ...node,
              children: [...(node.children || []), newFile],
              isExpanded: true
            };
          }
          if (node.children) {
            return { ...node, children: addToTree(node.children) };
          }
          return node;
        });
      };

      setFileSystem(addToTree(fileSystem));
      onFileOperation?.('create', newFile);
      setIsCreateDialogOpen(false);
      setNewItemName('');
    } catch (error) {
      console.error('Failed to create file:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fileSystem, flattenedFiles, onFileOperation, allowedExtensions, maxFileSize]);

  // Handle file deletion
  const handleDeleteFile = useCallback(async (file: FileSystemNode) => {
    if (!file) {
      return;
    }

    setIsLoading(true);
    try {
      const removeFromTree = (nodes: FileSystemNode[]): FileSystemNode[] => {
        return nodes.filter(node => {
          if (node.id === file.id) {
            return false;
          }
          if (node.children) {
            node.children = removeFromTree(node.children);
          }
          return true;
        });
      };

      setFileSystem(removeFromTree(fileSystem));
      onFileOperation?.('delete', file);
      setIsDeleteDialogOpen(false);
      setContextMenuFile(null);

      if (selectedFile?.id === file.id) {
        setSelectedFile(null);
      }
    } catch (error) {
      console.error('Failed to delete file:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fileSystem, selectedFile, onFileOperation]);

  // Handle file rename
  const handleRenameFile = useCallback(async (file: FileSystemNode, newName: string) => {
    if (!newName.trim() || newName === file.name) {
      return;
    }

    setIsLoading(true);
    try {
      const updateNode = (nodes: FileSystemNode[]): FileSystemNode[] => {
        return nodes.map(node => {
          if (node.id === file.id) {
            const extension = newName.split('.').pop()?.toLowerCase();
            return {
              ...node,
              name: newName.trim(),
              path: node.path.replace(file.name, newName.trim()),
              extension: node.type === 'file' ? extension : undefined,
              lastModified: new Date()
            };
          }
          if (node.children) {
            return { ...node, children: updateNode(node.children) };
          }
          return node;
        });
      };

      setFileSystem(updateNode(fileSystem));
      onFileOperation?.('rename', file, { newName: newName.trim() });
    } catch (error) {
      console.error('Failed to rename file:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fileSystem, onFileOperation]);

  // CopilotKit Action: Create File Structure
  useCopilotAction({
    name: "createFileStructure",
    description: "Create a complete file and directory structure based on project requirements.",
    parameters: [
      {
        name: "structure",
        type: "string",
        description: "JSON string describing the file structure to create",
        required: true
      },
      {
        name: "projectType",
        type: "string",
        description: "Type of project (react, node, nextjs, etc.)",
        enum: ["react", "nextjs", "node", "express", "vue", "angular"]
      }
    ],
    handler: async ({ structure, projectType = "react" }) => {
      setIsLoading(true);
      try {
        const structureData = JSON.parse(structure);
        // In production, this would create the actual file structure
        return `✅ Created ${projectType} project structure with ${Object.keys(structureData).length} items`;
      } catch (error) {
        return `❌ Error creating structure: ${error instanceof Error ? error.message : 'Invalid structure format'}`;
      } finally {
        setIsLoading(false);
      }
    },
    render: ({ args }) => (
      <div className="glass p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <FolderPlus className="h-4 w-4 animate-pulse" />
          <span className="font-medium">Creating file structure...</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Setting up {args?.projectType || 'project'} structure
        </p>
      </div>
    )
  });

  // CopilotKit Action: Organize Files
  useCopilotAction({
    name: "organizeFiles",
    description: "Organize and restructure files based on best practices and conventions.",
    parameters: [
      {
        name: "strategy",
        type: "string",
        description: "Organization strategy to apply",
        enum: ["by-feature", "by-type", "by-domain", "clean-architecture"],
        required: true
      },
      {
        name: "includeTests",
        type: "boolean",
        description: "Whether to organize test files as well"
      }
    ],
    handler: async ({ strategy, includeTests = true }) => {
      setIsLoading(true);
      try {
        // In production, this would reorganize the actual files
        const fileCount = flattenedFiles.filter(f => f.type === 'file').length;
        return `✅ Organized ${fileCount} files using ${strategy} strategy${includeTests ? ' (including tests)' : ''}`;
      } catch (error) {
        return `❌ Error organizing files: ${error instanceof Error ? error.message : 'Unknown error'}`;
      } finally {
        setIsLoading(false);
      }
    },
    render: ({ args }) => (
      <div className="glass p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span className="font-medium">Organizing files...</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Applying {args?.strategy} organization strategy
        </p>
      </div>
    )
  });

  // CopilotKit Action: Generate Boilerplate
  useCopilotAction({
    name: "generateBoilerplate",
    description: "Generate boilerplate code files for common patterns and components.",
    parameters: [
      {
        name: "template",
        type: "string",
        description: "Type of boilerplate to generate",
        enum: ["component", "hook", "service", "util", "test", "config"],
        required: true
      },
      {
        name: "name",
        type: "string",
        description: "Name for the generated file/component",
        required: true
      },
      {
        name: "features",
        type: "string",
        description: "Comma-separated list of features to include"
      }
    ],
    handler: async ({ template, name, features = "" }) => {
      setIsLoading(true);
      try {
        const featureList = features.split(',').map(f => f.trim()).filter(Boolean);

        // Generate appropriate boilerplate content
        let content = '';
        let fileName = '';

        switch (template) {
          case 'component':
            fileName = `${name}.tsx`;
            content = `import React from 'react';
import { cn } from '@/lib/utils';

interface ${name}Props {
  className?: string;
  children?: React.ReactNode;
}

export const ${name}: React.FC<${name}Props> = ({ className, children }) => {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
};

export default ${name};`;
            break;
          case 'hook':
            fileName = `use${name}.ts`;
            content = `import { useState, useEffect } from 'react';

export const use${name} = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Hook logic here
  }, []);

  return { state, setState };
};`;
            break;
          default:
            fileName = `${name}.ts`;
            content = `// Generated ${template} file\nexport const ${name} = () => {\n  // Implementation here\n};`;
        }

        // Create the file with content
        await handleCreateFile(fileName, 'file', selectedFile?.type === 'directory' ? selectedFile.id : undefined);

        // In production, this would also set the file content
        if (onFileChange && content) {
          const newFile: FileSystemNode = {
            id: `file-${Date.now()}`,
            name: fileName,
            type: 'file',
            path: `/${fileName}`,
            lastModified: new Date(),
            content
          };
          onFileChange(newFile, content);
        }

        return `✅ Generated ${template} boilerplate: ${fileName}${featureList.length ? ` with features: ${featureList.join(', ')}` : ''}`;
      } catch (error) {
        return `❌ Error generating boilerplate: ${error instanceof Error ? error.message : 'Unknown error'}`;
      } finally {
        setIsLoading(false);
      }
    },
    render: ({ args }) => (
      <div className="glass p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <FilePlus className="h-4 w-4 animate-pulse" />
          <span className="font-medium">Generating {args?.template}...</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Creating {args?.name} boilerplate
        </p>
      </div>
    )
  });

  // Render file tree node
  const renderFileNode = useCallback((file: FileSystemNode, depth: number = 0) => {
    const Icon = getFileIcon(file);
    const isSelected = selectedFile?.id === file.id;

    return (
      <div key={file.id}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              className={cn(
                "flex items-center gap-2 px-2 py-1 text-sm cursor-pointer hover:bg-accent rounded-sm transition-colors",
                isSelected && "bg-accent",
                "group"
              )}
              style={{ paddingLeft: `${depth * 16 + 8}px` }}
              onClick={() => {
                if (file.type === 'directory') {
                  handleDirectoryToggle(file);
                } else {
                  handleFileSelect(file);
                }
              }}
              onDoubleClick={() => {
                if (file.type === 'file') {
                  handleFileSelect(file);
                }
              }}
              draggable={enableDragDrop}
              onDragStart={(e) => {
                if (enableDragDrop) {
                  setDraggedFile(file);
                  e.dataTransfer.effectAllowed = 'move';
                }
              }}
              onDragOver={(e) => {
                if (enableDragDrop && file.type === 'directory') {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                }
              }}
              onDrop={(e) => {
                if (enableDragDrop && draggedFile && file.type === 'directory') {
                  e.preventDefault();
                  // Handle file move operation
                  console.log(`Moving ${draggedFile.name} to ${file.name}`);
                  setDraggedFile(null);
                }
              }}
            >
              {file.type === 'directory' && (
                <div className="w-4 h-4 flex items-center justify-center">
                  {file.isExpanded ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </div>
              )}
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate flex-1">{file.name}</span>
              {file.type === 'file' && file.size && (
                <Badge variant="outline" className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {(file.size / 1024).toFixed(1)}KB
                </Badge>
              )}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            {file.type === 'directory' && (
              <>
                <ContextMenuItem onClick={() => {
                  setContextMenuFile(file);
                  setCreateType('file');
                  setIsCreateDialogOpen(true);
                }}>
                  <FilePlus className="h-4 w-4 mr-2" />
                  New File
                </ContextMenuItem>
                <ContextMenuItem onClick={() => {
                  setContextMenuFile(file);
                  setCreateType('directory');
                  setIsCreateDialogOpen(true);
                }}>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Folder
                </ContextMenuItem>
                <ContextMenuSeparator />
              </>
            )}
            <ContextMenuItem onClick={() => {
              const newName = prompt('Enter new name:', file.name);
              if (newName) {
                handleRenameFile(file, newName);
              }
            }}>
              <Edit className="h-4 w-4 mr-2" />
              Rename
            </ContextMenuItem>
            <ContextMenuItem onClick={() => {
              // Copy file path to clipboard
              navigator.clipboard.writeText(file.path);
            }}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Path
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              className="text-destructive"
              onClick={() => {
                setContextMenuFile(file);
                setIsDeleteDialogOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        {file.type === 'directory' && file.isExpanded && file.children && (
          <div>
            {file.children.map(child => renderFileNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  }, [selectedFile, getFileIcon, handleDirectoryToggle, handleFileSelect, handleRenameFile, enableDragDrop, draggedFile, setDraggedFile]);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header */}
      {showToolbar && (
        <Card className="glass mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Folder className="h-5 w-5" />
                <span>File Manager</span>
                {isLoading && (
                  <Badge variant="secondary" className="animate-pulse">
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                    Processing...
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
                        onClick={() => {
                          setCreateType('file');
                          setIsCreateDialogOpen(true);
                        }}
                      >
                        <FilePlus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>New File</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCreateType('directory');
                          setIsCreateDialogOpen(true);
                        }}
                      >
                        <FolderPlus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>New Folder</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      )}

      {/* Search */}
      {showSearch && (
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* File Tree */}
      <Card className="flex-1 glass">
        <CardContent className="p-0">
          <ScrollArea className="h-full">
            <div className="p-2">
              {filteredFiles.length > 0 ? (
                filteredFiles.map(file => renderFileNode(file))
              ) : (
                <div className="flex items-center justify-center h-32 text-muted-foreground">
                  <div className="text-center">
                    <Folder className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">
                      {searchQuery ? 'No files found' : 'No files in this directory'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create New {createType === 'file' ? 'File' : 'Folder'}
            </DialogTitle>
            <DialogDescription>
              Enter a name for the new {createType === 'file' || 'folder'}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="item-name">Name</Label>
              <Input
                id="item-name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder={createType === 'file' ? 'example.tsx' : 'folder-name'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateFile(newItemName, createType, contextMenuFile?.id);
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => handleCreateFile(newItemName, createType, contextMenuFile?.id)}
              disabled={!newItemName.trim() || isLoading}
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : createType === 'file' ? (
                <FilePlus className="h-4 w-4 mr-2" />
              ) : (
                <FolderPlus className="h-4 w-4 mr-2" />
              )}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {contextMenuFile?.type === 'file' ? 'File' : 'Folder'}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{contextMenuFile?.name}&quot;?
              {contextMenuFile?.type === 'directory' && ' This will also delete all contents.'}
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => contextMenuFile && handleDeleteFile(contextMenuFile)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FileManager;
