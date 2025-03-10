import fileDB from '../models/file.model.js';

export const upload_files = async (req, res) => {
    try {
        //To return an array of metadatas
        let files_id = req.files.map(async (file, i) => {
            const fileContent = file.buffer;

            const metadata = req.body.metadata[i];
            const newFile = await new fileDB({ data: fileContent, metadata: metadata }).save();

            return { _id: newFile._id, metadata: metadata };
        });
        
        //To delete the files after saving them to the database

        files_id = await Promise.all(files_id);

        res.status(200).json(files_id);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const get_files = async (req, res) => {

    try {
        const { files_metadata } = req.body; //Takes an array of files_metadata from the post 
        
        const files_data = files_metadata.map(async (file) => { //To return an array of file data + id

            const data = await fileDB.findById(file._id).select('data');
            const decoded = data.data.toString();

            return {_id: file._id, data: decoded};
        });


        res.status(200).json(await Promise.all(files_data));
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}