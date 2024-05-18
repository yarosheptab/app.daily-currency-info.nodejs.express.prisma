const Mailjet = require("node-mailjet");
const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
);

function sendCurrencyEmailToUser(email, currencyData) {
    const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
            {
                From: {
                    Email: "yaroshepta.b@gmail.com",
                    Name: "Bohdan",
                },
                To: [
                    {
                        Email: email,
                    },
                ],
                Subject: "Your Daily Currency Exchange Rates!",
                TextPart: `Today's currency exchange rates ${currencyData.currency} to UAH are: ${currencyData.buy} (buy) and ${currencyData.sale} (sale)`,
                CustomID: "AppSendCurrencyRate",
            },
        ],
    });
    request
        .then((result) => {
            console.log(result.body);
        })
        .catch((err) => {
            console.log(err.statusCode);
        });
}

module.exports = { sendCurrencyEmailToUser };
