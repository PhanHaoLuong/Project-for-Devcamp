import { Suspense } from "react";
import EditorPanel from "../components/EditorPanel"
import LanguageSelector from "../components/LanguageSelector"
import { useCodeEditorStore } from "../store/useCodeEditorStore"

import '../styles/CodeEditor.css'

const CodeEditor = () => {
    const {getCode} = useCodeEditorStore();

    const handleSubmit = async (e) => { 
        e.preventDefault();

        try {
            const code = await getCode();
            console.log(code);
        } catch (error) {
            console.error('Error : ', error)
        }
    }
    return (
        <>
            <button className="submit-code-button" 
                onClick={handleSubmit}
            >
                submit code
            </button>
            <div className="editor-content">
                <LanguageSelector />
                <EditorPanel />
            </div>
        </>
    )
}

export default CodeEditor;