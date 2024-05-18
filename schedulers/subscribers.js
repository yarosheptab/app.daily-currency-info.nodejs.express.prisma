const schedule = require("node-schedule");

function runScheduler() {
    schedule.scheduleJob(process.env.NOTIFY_CRON ?? "0 10 * * *", function () {
        console.log("I'm a scheduled task!");
    });
}

module.exports = { runScheduler };
