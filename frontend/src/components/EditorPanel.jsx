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
            height="700px"
            language={codeLanguage || LANGUAGE_CONFIG[language].monacoLanguage}
            theme= "default"
            onMount={(editor) => {
                setEditor(editor)
            }}
            beforeMount={defineMonacoThemes}
            options={{
                minimap: { enabled: false },
                fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                hover: true,
                renderWhitespace: "selection",
                fontFamily: '"Fira Code","Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                scrollBeyondLastColumn: 0,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: false,
                scrollbar: {ignoreHorizontalScrollbarInContentHeight: true, handleMouseWheel: false, vertical: "hidden"},
                renderLineHighlight: "line",
                lineHeight: 19,
                letterSpacing: 0.5,
                roundedSelection: false,
            }}
            />
        </div>
    );
}

export default EditorPanel;