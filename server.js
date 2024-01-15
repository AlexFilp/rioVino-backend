require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 7777 } = process.env;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
