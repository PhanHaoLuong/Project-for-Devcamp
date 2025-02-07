import DisplayUpload from "../components/FileUpload";
import { useDropzone } from 'react-dropzone';
import Dropzone from "react-dropzone";

const Test = () => {
    const {getRootProps, getInputProps} = useDropzone()
    return (

        <>
            <DisplayUpload/>
        </>
    )
}

export default Test;