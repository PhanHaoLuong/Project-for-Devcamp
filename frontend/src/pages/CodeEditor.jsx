import EditorPanel from "../components/EditorPanel"
import LanguageSelector from "../components/LanguageSelector"
import { useCodeEditorStore } from "../store/useCodeEditorStore"

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
            <EditorPanel />
            <LanguageSelector />
            <button onClick={handleSubmit}></button>
        </>
    )
}

export default CodeEditor;