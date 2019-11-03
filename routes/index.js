const express = require("express");
const router = express.Router();

const loggedInUser = require("../middleware/loggedInUser");

router.get('/', loggedInUser, (req, res) => {
    res.render('index');
});

module.exports = router;