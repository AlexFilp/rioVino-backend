const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const vinesRouter = require("./routes/vinesRouter");
const authRouter = require("./routes/authRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/vines", vinesRouter);
app.use("/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || err.statusCode || 500).json({
    message: err.message || "Something went wrong, please try again later",
  });
});

module.exports = app;