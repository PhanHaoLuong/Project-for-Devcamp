import { LANGUAGE_CONFIG, defineMonacoThemes } from "../constants";
import { useCodeEditorStore } from "../store/useCodeEditorStore";
import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";


function CodeViewer({ codeContent, codeLanguage, lineCount }) {
    const { fontSize } = useCodeEditorStore();

    return (
        <div className="editor-panel" 
            onClick={e => e.stopPropagation()}
        >
            <Editor 
            height= {lineCount * 19 + "px"}
            language={codeLanguage}
            theme= "read-only"
            defaultValue={codeContent}
            beforeMount={defineMonacoThemes}
            options={{
                minimap: { enabled: false },
                fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                hover: false,
                renderWhitespace: "selection",
                fontFamily: '"Fira Code","Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                scrollBeyondLastColumn: 0,
                overviewRulerBorder: false,
                hideCursorInOverviewRuler: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: false,
                scrollbar: {ignoreHorizontalScrollbarInContentHeight: true, handleMouseWheel: false, vertical: "hidden"},
                renderLineHighlight: "line",
                lineHeight: 19,
                letterSpacing: 0.5,
                roundedSelection: false,
                lineNumbers: "off",
                readOnly: true,
                readOnlyMessage: {
                    value: null,
                },
            }}
            />
        </div>
    );
}

export default CodeViewer;