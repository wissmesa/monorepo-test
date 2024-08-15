function removeIncompleteObjects(arr) {
    return arr.filter(obj => {
        return obj.text && obj.number && obj.hex;
    });
}
exports.FileFormatter = async (arrayWithFilesNotFormatted, nameFiles) => {
    try {
        const result = [];
        arrayWithFilesNotFormatted.forEach((item, index) => {
            const lines = item.split('\n');
            const headers = lines[0].split(',');
            const fileData = {
                file: nameFiles[index],
                lines: []
            };

            lines.slice(1).forEach(line => {
                const values = line.split(',');
                const lineData = {};
                headers.slice(1).forEach((header, index) => {
                    lineData[header] = values[index + 1];
                });
                fileData.lines.push(lineData);
            });
            const validatedLinesOfFile = {
                ...fileData, lines: removeIncompleteObjects(fileData.lines)
            }
            result.push(validatedLinesOfFile);
        });
        return result;
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error processing files' });
    }
}

