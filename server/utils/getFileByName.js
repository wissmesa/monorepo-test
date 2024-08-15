exports.getFileByName = (array,fileReceived,res) => {
    const foundFile = array.find(file => file.file === fileReceived);
    if (foundFile) {
        res.json({ found: true, file: foundFile });
    } else {
        res.json({ found: false, message: 'Archivo no encontrado' });
    }
}
