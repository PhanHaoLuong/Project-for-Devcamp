const handleFolderCreation = (newFiles) => {
    const createdFolders = {}; 
    const folderArray = []; 

    newFiles.forEach(newFile => {
        const pathParts = newFile.path.split('/').slice(0, -1);

        let currPath = ""; 

        pathParts.forEach(folder => {
            currPath += (currPath ? "/" : "") + folder 
            if (!createdFolders[currPath]) {
                const folderObject = {
                    name: folder,
                    isFolder: true,
                    path: currPath,
                };
                createdFolders[currPath] = folderObject;
                folderArray.push(folderObject); 
            }
        });
    });

    return folderArray;
};

for (const folder of handleFolderCreation ([
    {path: 'example/folder/number/1/file.txt'},
    {path: 'example/folder/number/2/file.txt'},
    {path: 'example/new/folder/3/file.txt'}
])) {
    console.log(folder);
}
