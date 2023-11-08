const express = require('express');
const router = express.Router();

const {	verifyAndFetchFile } = require('../controllers/AddUserController');

router.get('/', function (req, res) {
    res.sendFile(__dirname + '/adduser.html');
})
router.post('/userManager', verifyAndFetchFile);

module.exports = router;
