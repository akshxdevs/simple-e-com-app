const mongoose = require("mongoose");

const mongoURL = "mongodb+srv://aksh:aksh0908@atlascluster.zjyi9.mongodb.net/";

const db = mongoose.connect(mongoURL, {
  dbName: "ecom-app"
})
  .then(() => {
    console.log("Connected to mongoDB successfully..");
  })
  .catch((error) => {
    console.log("Error connecting to mongoDB", error);
  });

module.exports = db;  
