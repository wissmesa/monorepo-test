const express = require('express');
const router = express.Router();
const {getAllFiles} = require('../controllers/Files');

router.get('/files/data', getAllFiles);
// router.get('/files/search', getFileByName);


module.exports = router;