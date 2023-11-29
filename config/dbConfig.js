const mongoose = require("mongoose");
require("dotenv").config();

const connection_url = process.env.CONNECTION_URL;

const mongoOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(connection_url, mongoOption)
  .then(() => console.log("Connected to mongo server."))
  .catch((err) => console.log("Error on connecting Mongo Server: ", err));
