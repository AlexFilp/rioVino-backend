require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 7777 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
