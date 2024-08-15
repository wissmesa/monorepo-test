const config = require("../config");
const { FileFormatter } = require('./fileFormatter');
const fetch = require("node-fetch");

exports.searchFilesByname = async (files) => {
    let arrayNameFiles = []
    const { files: arrayFiles } = files
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

}
