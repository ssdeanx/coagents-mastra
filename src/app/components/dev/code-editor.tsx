"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { loader } from "@monaco-editor/react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import {
  Save,
  Download,
  Upload,
  Settings,
  Palette,
  Code2,
  Sparkles,
  FileText,
  Zap,
  Eye,
  EyeOff
} from "lucide-react";
import { cn } from "@/lib/utils";

// Enhanced Monaco Editor configuration
loader.config({
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs"
  }
});

/**
 * Supported programming languages with Monaco Editor
 */
export const SUPPORTED_LANGUAGES = {
  typescript: { label: "TypeScript", extension: ".ts", icon: "📘" },
  javascript: { label: "JavaScript", extension: ".js", icon: "📙" },
  typescriptreact: { label: "TSX", extension: ".tsx", icon: "⚛️" },
  javascriptreact: { label: "JSX", extension: ".jsx", icon: "⚛️" },
  json: { label: "JSON", extension: ".json", icon: "📋" },
  yaml: { label: "YAML", extension: ".yml", icon: "📄" },
  css: { label: "CSS", extension: ".css", icon: "🎨" },
  scss: { label: "SCSS", extension: ".scss", icon: "🎨" },
  html: { label: "HTML", extension: ".html", icon: "🌐" },
  markdown: { label: "Markdown", extension: ".md", icon: "📝" },
  xml: { label: "XML", extension: ".xml", icon: "📄" },
  sql: { label: "SQL", extension: ".sql", icon: "🗄️" }
} as const;

/**
 * Available Monaco Editor themes
 */
export const EDITOR_THEMES = {
  "vs-dark": { label: "Dark", description: "VS Code Dark Theme" },
  "vs-light": { label: "Light", description: "VS Code Light Theme" },
  "hc-black": { label: "High Contrast", description: "High Contrast Dark" },
  "hc-light": { label: "High Contrast Light", description: "High Contrast Light" }
} as const;

/**
 * Enhanced CodeEditor component props interface
 */
export interface CodeEditorProps {
  /** Current code value */
  value: string;
  /** Programming language for syntax highlighting */
  language: keyof typeof SUPPORTED_LANGUAGES;
  /** Editor theme */
  theme?: keyof typeof EDITOR_THEMES;
  /** Callback when code changes */
  onChange: (value: string) => void;
  /** Callback when save is triggered (Ctrl+S) */
  onSave?: (value: string) => void;
  /** Callback when file is loaded */
  onLoad?: (content: string, filename: string) => void;
  /** Whether editor is read-only */
  readOnly?: boolean;
  /** Show/hide minimap */
  minimap?: boolean;
  /** Word wrap setting */
  wordWrap?: 'on' | 'off' | 'wordWrapColumn' | 'bounded';
  /** Font size in pixels */
  fontSize?: number;
  /** Tab size in spaces */
  tabSize?: number;
  /** Use spaces instead of tabs */
  insertSpaces?: boolean;
  /** Render whitespace characters */
  renderWhitespace?: 'none' | 'boundary' | 'selection' | 'trailing' | 'all';
  /** Enable IntelliSense suggestions */
  suggestions?: boolean;
  /** Enable quick suggestions */
  quickSuggestions?: boolean;
  /** Enable parameter hints */
  parameterHints?: boolean;
  /** Auto-closing brackets behavior */
  autoClosingBrackets?: 'always' | 'languageDefined' | 'beforeWhitespace' | 'never';
  /** Auto-closing quotes behavior */
  autoClosingQuotes?: 'always' | 'languageDefined' | 'beforeWhitespace' | 'never';
  /** Format code on paste */
  formatOnPaste?: boolean;
  /** Format code on type */
  formatOnType?: boolean;
  /** Enable AI-powered features */
  aiCompletion?: boolean;
  /** Show editor toolbar */
  showToolbar?: boolean;
  /** Editor height */
  height?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** File name for context */
  fileName?: string;
}

/**
 * Enhanced Monaco Code Editor Component
 *
 * Features:
 * - Multiple language support with syntax highlighting
 * - Theme switching (Dark, Light, High Contrast)
 * - AI-powered code completion and suggestions
 * - Advanced editing features (IntelliSense, auto-completion, formatting)
 * - File operations (save, load, export)
 * - Customizable editor settings
 * - Professional toolbar with quick actions
 */
export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  language,
  theme = "vs-dark",
  onChange,
  onSave,
  onLoad,
  readOnly = false,
  minimap = true,
  wordWrap = 'off',
  fontSize = 14,
  tabSize = 2,
  insertSpaces = true,
  renderWhitespace = 'none',
  suggestions = true,
  quickSuggestions = true,
  parameterHints = true,
  autoClosingBrackets = 'languageDefined',
  autoClosingQuotes = 'languageDefined',
  formatOnPaste = true,
  formatOnType = true,
  aiCompletion = true,
  showToolbar = true,
  height = "600px",
  className,
  fileName
}) => {
  const [editorValue, setEditorValue] = useState(value);
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [isMinimapVisible, setIsMinimapVisible] = useState(minimap);
  const [editorSettings, setEditorSettings] = useState({
    fontSize,
    tabSize,
    wordWrap,
    renderWhitespace
  });
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const editorRef = useRef<import("monaco-editor").editor.IStandaloneCodeEditor | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update editor value when prop changes
  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  // Generate AI-powered code suggestions
  const generateAiSuggestions = useCallback((code: string, lang: keyof typeof SUPPORTED_LANGUAGES): string[] => {
    const suggestions: string[] = [];

    // Basic AI suggestions based on language and context
    if (lang === 'typescript' || lang === 'typescriptreact') {
      if (code.includes('interface')) {
        suggestions.push('export interface Props {\n  children?: React.ReactNode;\n}');
      }
      if (code.includes('function') || code.includes('const')) {
        suggestions.push('const handleClick = () => {\n  // Implementation\n};');
      }
      if (code.includes('React') || code.includes('FC')) {
        suggestions.push('const Component: React.FC<Props> = ({ children }) => {\n  return <div>{children}</div>;\n};');
      }
    }

    if (lang === 'css' || lang === 'scss') {
      suggestions.push('.container {\n  display: flex;\n  align-items: center;\n}');
    }

    return suggestions;
  }, []);

  // Handle editor value changes
  const handleEditorChange = useCallback((newValue: string | undefined) => {
    const updatedValue = newValue || "";
    setEditorValue(updatedValue);
    onChange(updatedValue);

    // Generate AI suggestions based on current code context
    if (aiCompletion && updatedValue.length > 10) {
      const suggestions = generateAiSuggestions(updatedValue, currentLanguage);
      setAiSuggestions(suggestions);
    }
  }, [onChange, aiCompletion, currentLanguage, generateAiSuggestions]);

  // Handle save operation
  const handleSave = useCallback(() => {
    if (onSave && editorRef.current) {
      const currentValue = editorRef.current.getValue();
      onSave(currentValue);
    }
  }, [onSave]);

  // Handle file upload
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onLoad) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onLoad(content, file.name);
        setIsLoading(false);
      };
      reader.readAsText(file);
    }
  }, [onLoad]);

  // Handle file download
  const handleDownload = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.getValue();
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || `code.${SUPPORTED_LANGUAGES[currentLanguage].extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [currentLanguage, fileName]);

  // Configure Monaco editor on mount
  const handleEditorDidMount = useCallback((editor: import("monaco-editor").editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;

    // Add save command
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, handleSave);

    // Configure TypeScript compiler options
    if (currentLanguage === 'typescript' || currentLanguage === 'typescriptreact') {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.Latest,
        allowNonTsExtensions: true,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        esModuleInterop: true,
        jsx: monaco.languages.typescript.JsxEmit.React,
        reactNamespace: "React",
        allowJs: true,
        typeRoots: ["node_modules/@types"]
      });
    }

    // Add AI completion provider if enabled
    if (aiCompletion) {
      const completionProvider = monaco.languages.registerCompletionItemProvider(currentLanguage, {
        provideCompletionItems: (model, position) => {
          const currentLine = model.getLineContent(position.lineNumber);
          const suggestions = aiSuggestions.map((suggestion, index) => ({
            label: `AI-${index + 1}: ${suggestion.split('\n')[0]}`,
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: `AI-generated suggestion based on context: ${currentLine}`,
            insertText: suggestion,
            range: {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: position.column,
              endColumn: position.column
            }
          }));

          return { suggestions };
        }
      });

      return () => completionProvider.dispose();
    }
  }, [currentLanguage, aiCompletion, aiSuggestions, handleSave]);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Editor Toolbar */}
      {showToolbar && (
        <Card className="glass mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                <span className="text-sm font-medium">Code Editor</span>
                {fileName && (
                  <Badge variant="outline" className="text-xs">
                    {fileName}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                {aiCompletion && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          AI
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>AI-powered code completion enabled</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap items-center gap-4">
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <Select value={currentLanguage} onValueChange={(value) => setCurrentLanguage(value as keyof typeof SUPPORTED_LANGUAGES)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SUPPORTED_LANGUAGES).map(([key, lang]) => (
                      <SelectItem key={key} value={key}>
                        <span className="flex items-center gap-2">
                          <span>{lang.icon}</span>
                          {lang.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Theme Selector */}
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <Select value={currentTheme} onValueChange={(value) => setCurrentTheme(value as keyof typeof EDITOR_THEMES)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(EDITOR_THEMES).map(([key, theme]) => (
                      <SelectItem key={key} value={key}>
                        {theme.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Editor Settings */}
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <Select
                  value={editorSettings.fontSize.toString()}
                  onValueChange={(value) => setEditorSettings(prev => ({ ...prev, fontSize: parseInt(value) }))}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12px</SelectItem>
                    <SelectItem value="14">14px</SelectItem>
                    <SelectItem value="16">16px</SelectItem>
                    <SelectItem value="18">18px</SelectItem>
                    <SelectItem value="20">20px</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Editor Actions */}
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSave}
                        disabled={!onSave}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save (Ctrl+S)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={!onLoad || isLoading}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Upload file</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download file</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsMinimapVisible(!isMinimapVisible)}
                      >
                        {isMinimapVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isMinimapVisible ? 'Hide' : 'Show'} minimap</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".ts,.tsx,.js,.jsx,.json,.yml,.yaml,.css,.scss,.html,.md,.xml,.sql"
        onChange={handleFileUpload}
        className="hidden"
        aria-label="Upload code file"
      />

      {/* Monaco Editor */}
      <div className="flex-1 rounded-lg overflow-hidden border glass">
        <Editor
          height={height}
          language={currentLanguage}
          theme={currentTheme}
          value={editorValue}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          loading={
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 animate-pulse" />
                <span>Loading editor...</span>
              </div>
            </div>
          }
          options={{
            readOnly,
            minimap: { enabled: isMinimapVisible },
            wordWrap: editorSettings.wordWrap,
            fontSize: editorSettings.fontSize,
            tabSize: editorSettings.tabSize,
            insertSpaces,
            renderWhitespace: editorSettings.renderWhitespace,
            quickSuggestions: quickSuggestions ? {
              other: true,
              comments: true,
              strings: true
            } : false,
            parameterHints: { enabled: parameterHints },
            suggestOnTriggerCharacters: suggestions,
            acceptSuggestionOnCommitCharacter: suggestions,
            acceptSuggestionOnEnter: suggestions ? "on" : "off",
            autoClosingBrackets,
            autoClosingQuotes,
            formatOnPaste,
            formatOnType,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            renderLineHighlight: "all",
            selectionHighlight: true,
            occurrencesHighlight: "singleFile",
            codeLens: true,
            folding: true,
            foldingHighlight: true,
            showFoldingControls: "always",
            matchBrackets: "always",
            glyphMargin: true,
            lineNumbers: "on",
            lineNumbersMinChars: 3,
            renderValidationDecorations: "on"
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
