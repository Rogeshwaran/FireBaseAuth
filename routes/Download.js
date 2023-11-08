const express = require('express');
const router = express.Router();

const {	verifyAndFetchFile } = require('../controllers/DownloadController');

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/download.html');
})
router.post('/verify', verifyAndFetchFile);

module.exports = router;
