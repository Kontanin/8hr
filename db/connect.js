const mongoose = require('mongoose');
mongoose.connection.syncIndexes()

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
