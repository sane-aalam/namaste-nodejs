// First be sure you have MongoDB and Node.js installed.
// Next install Mongoose from the command line using npm:
// npm install mongoose --save

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://saneraza78692:BGTe2W77UypoFavk@cluster0.xfoad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
};

// export the module
module.exports = connectDB;

