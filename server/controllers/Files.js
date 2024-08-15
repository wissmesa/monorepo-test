const config = require('../config/index');
const { getFileByName } = require('../utils/getFileByName');
const { searchFilesByname } = require('../utils/searchFilesByname');

exports.getAllFiles = async (req, res) => {
    try {
        const response = await fetch('https://echo-serv.tbxnet.com/v1/secret/files', {
            headers: {
                'Authorization': `Bearer ${config.token}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const files = await searchFilesByname(data)
        if (req.query.file) {
             getFileByName(files,req.query.file,res)
        }else{
            res.json(files);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
