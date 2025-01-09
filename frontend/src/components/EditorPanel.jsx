import { LANGUAGE_CONFIG } from "../constants";
import { useCodeEditorStore } from "../store/useCodeEditorStore";
import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";


function EditorPanel() {
    const { language, editor, fontSize, setEditor } = useCodeEditorStore();

    useEffect(() => {
        const newCode = LANGUAGE_CONFIG[language].defaultCode;
        if(editor) {
            editor.setValue(newCode);
        }
    },[language, editor]);


    return (
        <div className="editor-panel">
            <Editor 
            height="600px"
            language={LANGUAGE_CONFIG[language].monacoLanguage}
            theme="vs-dark"
            onMount={(editor) => setEditor(editor)}
            options={{
                minimap: {enabled: true},
                fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                renderWhitespace: "selection",
                fontFamily: '"Fira Code","Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
                
            }}
            />
        </div>
    );
}

export default EditorPanel;