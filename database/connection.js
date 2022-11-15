const mongooseDb = require("mongoose");

const config = require("../config");

mongooseDb.Promise = global.Promise;

const atlasUrl = `${config.mongo.MONGO_ATLAS_URL}`;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongooseDb.set("debug", true);

mongooseDb
  .connect(atlasUrl, options)
  .then(() => {
    console.log("CONNECTED TO MONGODB ATLAS!");
  })
  .catch(() => {
    console.error("FAILED TO CONNECT TO MONGODB ATLAS!");
  });

mongooseDb.connection
  .once("open", function () {
    console.log("Connection has been made");
  })
  .on("error", function (error) {
    console.log("Connect error", error);
  })
  .on("disconnected", function () {
    console.log("Connection disconnected");
  });

module.exports = mongooseDb;
