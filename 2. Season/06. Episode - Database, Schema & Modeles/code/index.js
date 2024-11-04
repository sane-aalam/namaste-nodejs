const express = require("express");
const app = express();
const connectDB = require("./config/database");
const port = 7777;
const User = require("./Modles/user.js");

// create modle using Schema
app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Virat",
    lastName: "Kholi",
    emaildId: "virat@gmail.com",
    password: "virat@123",
    age: 40,
    gender: "male",
  });

  try {
    await user.save();
    res.send("Now that the user is added successfully!");
  } catch (err) {
    res.send("error saving into user" + err.masssge);
  }
});

// step-1 priority to connect database
// step-2 then run our server using express js
// This is right way to connect our data using (Mongoose)!
// connectDB.return(HappyCase,BadCase), This is promise!
connectDB()
  .then(() => {
    console.log("database connection is established!");
    app.listen(port, () => {
      console.log("Server running on port 4000");
    });
  })
  .catch(() => {
    console.log("database connection is not established!");
  });
