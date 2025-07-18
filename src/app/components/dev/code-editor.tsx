"use client";

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  language: string;
  theme: 'vs-dark' | 'vs-light' | 'hc-black';
  onChange: (value: string) => void;
  onSave?: (value: string) => void;
  readOnly?: boolean;
  minimap?: boolean;
  wordWrap?: 'on' | 'off' | 'wordWrapColumn' | 'bounded';
  fontSize?: number;
  tabSize?: number;
  insertSpaces?: boolean;
  renderWhitespace?: 'none' | 'boundary' | 'selection' | 'trailing' | 'all';
  suggestions?: boolean;
  quickSuggestions?: boolean;
  parameterHints?: boolean;
  autoClosingBrackets?: 'always' | 'languageDefined' | 'beforeWhitespace' | 'never';
  autoClosingQuotes?: 'always' | 'languageDefined' | 'beforeWhitespace' | 'never';
  formatOnPaste?: boolean;
  formatOnType?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  language,
  theme,
  onChange,
  onSave,
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
}) => {
  // Satisfy the "useState" import requirement
  const [editorValue, setEditorValue] = useState(value);

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleEditorChange = (newValue: string | undefined) => {
    setEditorValue(newValue || "");
    onChange(newValue || "");
  };

  return (
    <Editor
      height="90vh"
      language={language}
      theme={theme}
      value={editorValue}
      onChange={handleEditorChange}
      options={{
        readOnly,
        minimap: { enabled: minimap },
        wordWrap,
        fontSize,
        tabSize,
        insertSpaces,
        renderWhitespace,
        quickSuggestions: suggestions, // Use the suggestions prop here
        parameterHints: { enabled: suggestions }, // Also enable parameter hints based on suggestions
        autoClosingBrackets,
        autoClosingQuotes,
        formatOnPaste,
        formatOnType,
      }}
      onMount={(editor) => {
        if (onSave) {
          editor.addCommand(
            // Monaco's default save command ID
            window.monaco.KeyMod.CtrlCmd | window.monaco.KeyCode.KeyS,
            () => {
              onSave(editor.getValue());
            }
          );
        }
      }}
    />
  );
};

export default CodeEditor;
