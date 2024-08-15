const config = require("../config");
const { FileFormatter } = require('./fileFormatter');

exports.searchFilesByname = async (files) => {
    console.log(files, 'archivosss')
    let arrayNameFiles = []
    const { files: arrayFiles } = files
    try {
        const results = [];
        for (const file of arrayFiles) {
            const response = await fetch(`https://echo-serv.tbxnet.com/v1/secret/file/${file}`, {
                headers: {
                    'Authorization': `Bearer ${config.token}`
                }
            });

            if (!response.ok) {
                console.warn(`Error fetching data for file ${file} (status: ${response.status})`);
            } else {
                arrayNameFiles.push(file)
                const data = await response.text(); // Obtener el texto de la respuesta
                const lines = data.split('\n');
                const formattedData = lines.map(line => line.split(',')).join('\n');
                results.push(formattedData);
            }
        }
        const newarray = await FileFormatter(results, arrayNameFiles)
        return newarray
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error processing files' });
    }
}
