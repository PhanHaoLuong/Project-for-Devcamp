import { LANGUAGE_CONFIG, defineMonacoThemes } from "../constants";
import { useCodeEditorStore } from "../store/useCodeEditorStore";
import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";


function EditorPanel({ codeContent }) {
    const { language, editor, fontSize, setEditor } = useCodeEditorStore();

    useEffect(() => {
        const newCode = LANGUAGE_CONFIG[language].defaultCode;
        if(editor) {
            if (!codeContent) {
                editor.setValue(newCode);}
            else if (codeContent in LANGUAGE_CONFIG) {
                editor.setValue(newCode);}
            else {
                editor.setValue(codeContent);
            }
        }
    },[language, editor]);


    return (
        <div className="editor-panel">
            <Editor 
            height="600px"
            language={LANGUAGE_CONFIG[language].monacoLanguage}
            theme="default"
            onMount={(editor) => setEditor(editor)}
            beforeMount={defineMonacoThemes}
            options={{
                minimap: { enabled: false },
                fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                renderWhitespace: "selection",
                fontFamily: '"Fira Code","Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: false,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
                lineNumbers: "on",
                readOnly: false,
                readOnlyMessage: {
                    value: null,
                },
            }}
            />
        </div>
    );
}

export default EditorPanel;