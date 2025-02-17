import EditorPanel from "../components/EditorPanel"
import LanguageSelector from "../components/LanguageSelector"
import { useCodeEditorStore } from "../store/useCodeEditorStore"

import '../styles/CodeEditor.css'

const CodeEditor = ({ setCodeContent, setCodeEdit ,codeContent, setCodeLanguage, setLineCount }) => {
    const { getCode, editor } = useCodeEditorStore();

    const handleSubmit = async (e) => { 
        e.preventDefault();

        try {
            const code = getCode();
            setLineCount(editor.getModel().getLineCount())
            setCodeContent(code);
            setCodeEdit(false);
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
                <LanguageSelector setCodeLanguage={setCodeLanguage}/>
                <EditorPanel codeContent={codeContent}/>
            </div>
        </>
    )
}

export default CodeEditor;