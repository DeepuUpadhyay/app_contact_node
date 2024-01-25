const express = require("express");
const errorHandler = require("./middleware/errorHandler");

require('./config')
const app = express();
const port = 5000;
app.use(express.json())

app.use("/api/contacts",require("./route/contactRoute"))
app.use("/api/users",require("./route/userRoute"))
app.use(errorHandler)


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
