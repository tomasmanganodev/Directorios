const express = require('express');
const controller = require('../controller/jsons.js');
const upload = require('../middleware/middleware.js');

const router = express.Router();

router.get('/api/directories/:directoryName', controller.getDirectories);
router.post('/api/upload/:directoryName', upload.single('jsonFile'), controller.postDirectories);

module.exports = router;