const schedule = require("node-schedule");
const { getSubscribers } = require("../prisma/queries");
const { getTodayCurrencyRate } = require("../controllers/currency");
const { sendCurrencyEmailToUser } = require("../controllers/subscribers");

function runScheduler() {
    schedule.scheduleJob(
        process.env.NOTIFY_CRON ?? "0 10 * * *",
        async function () {
            const [subscribers, currencyRate] = await Promise.all([
                getSubscribers(),
                getTodayCurrencyRate(),
            ]);

            subscribers.forEach((subscriber) =>
                sendCurrencyEmailToUser(subscriber.email, currencyRate)
            );
        }
    );
}

module.exports = { runScheduler };
