const mongoose = require("mongoose");
const config = require("config");

const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`)
  .then(function () {
    dbgr("Database Connected");
  })
  .catch(function (err) {
    dbgr("Error" + err);
  });

module.exports = mongoose.connection;
