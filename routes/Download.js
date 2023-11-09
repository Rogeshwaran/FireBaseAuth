const express = require('express');
const router = express.Router();

const {	verifyAndFetchFile, addFileRecord } = require('../controllers/DownloadController');

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/download.html');
})
router.post('/verify', verifyAndFetchFile);
router.post('/update', addFileRecord);

module.exports = router;
