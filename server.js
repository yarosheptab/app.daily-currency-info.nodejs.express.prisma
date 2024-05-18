const express = require("express");
const app = express();

const currencyRoute = require("./routes/currency");

app.use("/api/v1/currency", currencyRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
