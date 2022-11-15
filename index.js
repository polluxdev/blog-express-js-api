const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const AppError = require("./utils/appError");
const config = require("./config");
const routes = require("./routes");

const app = express();
const port = config.PORT || 3000;
const apiVersion = config.API_VERSION;
const appVersion = "v1.0.0";

console.log("App version :", appVersion);

const limiter = rateLimit({
  max: config.MAX_RATE_LIMIT * 1000,
  windowMs: config.RESET_RATE_INTERVAL * 60 * 60 * 1000,
  message: "Too many request from this IP! Please try again in an hour.",
});

app.use(apiVersion, limiter);

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: config.APP_NAME,
  });
});

app.use(apiVersion, routes);

app.all("*", (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server.`,
    404
  );
  next(error);
});

app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Something went wrong.",
  });
});

app.listen(port, () => {
  console.log(`Running on port :${port}`);
});

process.on("unhandledRejection", (error) => {
  console.log("UNHANDLED REJECTION.");
  console.log(error);

  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (error) => {
  console.log("UNCAUGHT EXCEPTION.");
  console.log(error.name, error.message);

  server.close(() => {
    process.exit(1);
  });
});
