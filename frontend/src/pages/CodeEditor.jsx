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
            const code = getCode();
            console.log(code);
        } catch (error) {
            console.error('Error : ', error)
        }
    }
    return (
        <>
            <div className="page-content">
                <EditorPanel />
                <LanguageSelector />
                <button onClick={handleSubmit}></button>
            </div>
        </>
    )
}

export default CodeEditor;