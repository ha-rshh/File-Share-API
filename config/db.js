

require("dotenv").config();
const mongoose = require("mongoose");
function connectDB() {
      mongoose.connect(process.env.MONGO_CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
      });

      const connection = mongoose.connection;

      connection.once('open', () => {
            console.log("DB connected successfully");
      });
      connection.on('error', () => {
            console.log("DB connection failed");
      });
}

module.exports = connectDB;
// mIAY0a6u1ByJsWWZ