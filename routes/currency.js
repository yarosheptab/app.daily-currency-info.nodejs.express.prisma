const express = require("express");
const { HttpStatusCode } = require("axios");
const { getTodayCurrencyRate } = require("../controllers/currency");
const { UNEXPECTED_ERROR_MESSAGE } = require("../utils/constants");
const router = express.Router();

router.get("/today", async (req, res) => {
    try {
        const todayCurrencyRate = await getTodayCurrencyRate();

        res.status(HttpStatusCode.Ok).send(todayCurrencyRate);
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.InternalServerError).send({
            message: error?.message ?? UNEXPECTED_ERROR_MESSAGE,
        });
    }
});

module.exports = router;
