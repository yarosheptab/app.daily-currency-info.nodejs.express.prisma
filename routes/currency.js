const express = require("express");
const router = express.Router();

router.get("/today", (req, res) => {
    res.send("this is user route");
});

module.exports = router;
