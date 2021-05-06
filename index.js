const app = require("./api/app");
require("dotenv").config();

const port = process.env.PORT || 5000;
process.env.API_KEY || "gaga";

app.listen(port, () => console.log(`Listening on port ${port}...`));
