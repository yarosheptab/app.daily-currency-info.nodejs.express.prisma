const express = require("express");
const { HttpStatusCode } = require("axios");
const { getTodayCurrencyRate } = require("../controllers/currency");
const { UNEXPECTED_ERROR_MESSAGE } = require("../utils/constants");
const { createSubscriber, getSubscriberByEmail } = require("../prisma/queries");
const { z } = require("zod");
const router = express.Router();

const FormSchema = z.object({
    email: z
        .string({ message: "Email should be a string." })
        .email({ message: "Provide a valid email." }),
});

router.get("/rate", async (req, res) => {
    try {
        const todayCurrencyRate = await getTodayCurrencyRate();

        res.status(HttpStatusCode.Ok).send(todayCurrencyRate.buy);
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.InternalServerError).send({
            message: error?.message ?? UNEXPECTED_ERROR_MESSAGE,
        });
    }
});

router.post("/subscribe", async (req, res) => {
    try {
        const requestBody = req.body;

        const validation = FormSchema.safeParse(requestBody);

        if (!validation.success) {
            return res.status(HttpStatusCode.UnprocessableEntity).send({
                errors: validation.error.errors,
            });
        }

        const subs = await getSubscriberByEmail(requestBody.email);

        if (subs.length) {
            return res.status(HttpStatusCode.Conflict).send({
                error: "Цей емейл вже підписаний",
            });
        }

        await createSubscriber(requestBody.email);

        res.status(HttpStatusCode.Ok).send({
            message: "E-mail додано",
        });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.InternalServerError).send({
            message: error?.message ?? UNEXPECTED_ERROR_MESSAGE,
        });
    }
});

module.exports = router;
