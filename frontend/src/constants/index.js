// import { Monaco } from "@monaco-editor/react";

export const LANGUAGE_CONFIG = {
  javascript: {
    id: "javascript",
    label: "JavaScript",
    logoPath: "/javascript.png",
    pistonRuntime: { language: "javascript", version: "18.15.0" },
    monacoLanguage: "javascript",
    defaultCode: `// JavaScript`
  },
  typescript: {
    id: "typescript",
    label: "TypeScript",
    logoPath: "/typescript.png",
    pistonRuntime: { language: "typescript", version: "5.0.3" },
    monacoLanguage: "typescript",
    defaultCode: `// TypeScript`
  },
  python: {
    id: "python",
    label: "Python",
    logoPath: "/python.png",
    pistonRuntime: { language: "python", version: "3.10.0" },
    monacoLanguage: "python",
    defaultCode: `# Python`
  },
  java: {
    id: "java",
    label: "Java",
    logoPath: "/java.png",
    pistonRuntime: { language: "java", version: "15.0.2" },
    monacoLanguage: "java",
    defaultCode: `//java`,
  },
  go: {
    id: "go",
    label: "Go",
    logoPath: "/go.png",
    pistonRuntime: { language: "go", version: "1.16.2" },
    monacoLanguage: "go",
    defaultCode: `//go`,
  },
  rust: {
    id: "rust",
    label: "Rust",
    logoPath: "/rust.png",
    pistonRuntime: { language: "rust", version: "1.68.2" },
    monacoLanguage: "rust",
    defaultCode: `// Rust`,
  },
  cpp: {
    id: "cpp",
    label: "C++",
    logoPath: "/cpp.png",
    pistonRuntime: { language: "cpp", version: "10.2.0" },
    monacoLanguage: "cpp",
    defaultCode: `// C++`,
  },
  csharp: {
    id: "csharp",
    label: "C#",
    logoPath: "/csharp.png",
    pistonRuntime: { language: "csharp", version: "6.12.0" },
    monacoLanguage: "csharp",
    defaultCode: `// C#`,
  },
  ruby: {
    id: "ruby",
    label: "Ruby",
    logoPath: "/ruby.png",
    pistonRuntime: { language: "ruby", version: "3.0.1" },
    monacoLanguage: "ruby",
    defaultCode: `# Ruby`,
  },
  swift: {
    id: "swift",
    label: "Swift",
    logoPath: "/swift.png",
    pistonRuntime: { language: "swift", version: "5.3.3" },
    monacoLanguage: "swift",
    defaultCode: `// Swift`,
  },
};

export const THEME_DEFINITONS = {
  "default": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "8d6b7e" },
      { token: "string", foreground: "5c7453" },
      { token: "keyword", foreground: "715181" },
      { token: "number", foreground: "ce996e" },
      { token: "type", foreground: "5e75a3" },
      { token: "class", foreground: "ffa657" },
      { token: "function", foreground: "377775" },
      { token: "variable", foreground: "c5ab75" },
      { token: "operator", foreground: "ff7b72" },
    ],
    colors: {
      "editor.background": "#111722",
      "editor.foreground": "#c9d1d9",
      "editor.lineHighlightBackground": "#192131",
      "editorLineNumber.foreground": "#5c6473",
      "editorLineNumber.activeForeground": "#BBC7DD",
      "editorIndentGuide.background": "#21262d",
      "editor.selectionBackground": "#264f78",
      "editor.inactiveSelectionBackground": "#264f7855",
    },
  },
  "read-only": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "8d6b7e" },
      { token: "string", foreground: "5c7453" },
      { token: "keyword", foreground: "715181" },
      { token: "number", foreground: "ce996e" },
      { token: "type", foreground: "5e75a3" },
      { token: "class", foreground: "ffa657" },
      { token: "function", foreground: "377775" },
      { token: "variable", foreground: "c5ab75" },
      { token: "operator", foreground: "ff7b72" },
    ],
    colors: {
      "editor.background": "#131925",
      "editor.foreground": "#c9d1d9",
      "editor.lineHighlightBackground": "#131925",
    },
  },
};

// Helper function to define themes in Monaco
export const defineMonacoThemes = (monaco) => { 
  Object.entries(THEME_DEFINITONS).forEach(([themeName, themeData]) => {
    monaco.editor.defineTheme(themeName, {
      base: themeData.base,
      inherit: themeData.inherit,
      rules: themeData.rules.map((rule) => ({
        ...rule,
        foreground: rule.foreground,
      })),
      colors: themeData.colors,
    });
  });
};