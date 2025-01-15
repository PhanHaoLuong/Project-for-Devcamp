import { LANGUAGE_CONFIG, defineMonacoThemes } from "../constants";
import { useCodeEditorStore } from "../store/useCodeEditorStore";
import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { use } from "react";


function EditorPanel({ codeContent, codeLanguage, isViewing, lineCount }) {
    const { language, editor, fontSize, setEditor } = useCodeEditorStore();

    useEffect(() => {
        if(editor) {
            if(codeContent) {
                editor.setValue(codeContent);
            }
            else{
                editor.setValue("");
            }
        }
    },[language, editor]);

    
        

    return (
        <div className="editor-panel">
            <Editor 
            height={lineCount * 19}
            language={codeLanguage || LANGUAGE_CONFIG[language].monacoLanguage}
            theme= {isViewing ? "read-only" : "default"}
            onMount={(editor) => {
                setEditor(editor)
                console.log(lineCount)
            }}
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
                lineHeight: 19,
                letterSpacing: 0.5,
                roundedSelection: true,
                lineNumbers: isViewing ? "off" : "on",
                readOnly: isViewing || false,
                readOnlyMessage: {
                    value: null,
                },
            }}
            />
        </div>
    );
}

export default EditorPanel;