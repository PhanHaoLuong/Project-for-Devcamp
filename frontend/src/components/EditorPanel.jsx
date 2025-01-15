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
            height={isViewing? lineCount * 19 + "px" : "700px"}
            language={codeLanguage || LANGUAGE_CONFIG[language].monacoLanguage}
            theme= {isViewing ? "read-only" : "default"}
            onMount={(editor) => {
                setEditor(editor)
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
                overviewRulerBorder: isViewing? false : true,
                hideCursorInOverviewRuler: isViewing? true : false,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: false,
                renderLineHighlight: "line",
                lineHeight: 19,
                letterSpacing: 0.5,
                roundedSelection: false,
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