const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// const fileupload = require("express-fileupload");
require("dotenv").config();
const path = require("path");

// -------------------------------------- App config -------------------------------------//
const PORT = process.env.PORT || 5000;
const app = express();

// ------------------------------------- Middlewares ------------------------------------ //
// app.use(fileupload());
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, PUT");
    return res.status(200).json({});
  }

  next();
});

// --------------------------------------------- DB config ----------------------------------- //
require("./config/dbConfig");

// ---------------------------------------------- Routes -------------------------------------- //
const Routers = require("./router/routes");
app.use("/api/", Routers);

// -------------------------------------------- Error handling -------------------------------//
app.use((req, res, next) => {
  return res.status(404).json({
    success: 0,
    message: "This Route doesn't exist!",
  });
});

// -------------------------------------------- Listening server -----------------------------//
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
