const express = require("express");
const app = express();
const connectDB = require("./config/database");
const port = 7777;
const User = require("./Modles/user.js");

// middleware to using Json data as Object!
/*{
  firstName: "Rohit Shrama T20 Winner Captain of indain!',
  lastName: 'Captain(IndainTeam)',
  emaildId: 'RohitBhai@gmail.com',
  password: 'indainTeamcaptain@123',
  age: 41,
  gender: 'male'
}
*/

app.use(express.json());

// create modle using Schema
app.post("/signup", async (req, res) => {
  // send the data dynamiclly using postman
  const user = new User(req.body);
  try {
    await user.save();
    res.send("The user is added successfully!");
  } catch (err) {
    res.send("error saving into user" + err.masssge);
  }
});

// bluid API to search emailId
// step-1 go to DB.find(), resolve promise!
app.get("/user", async (req, res) => {
  const currentUserEmail = req.body.emailId;
  console.log(currentUserEmail);
  try {
    const data = await User.find({ emailId: currentUserEmail });
    res.send(data);
  } catch (err) {
    res.send("error are getting!");
  }
});

// bluid API to search feed,ALL user documents
app.get("/feed", async (req, res) => {
  // Try and Catch Must Set-up
  try {
    const data = await User.find({});
    res.send(data);
  } catch (err) {
    res.send("error saving into user", err, msg);
  }
});

// bluid API - delete
// get userID which you want to delete into database!
// according to userId, delete the database document!
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const data = await User.findByIdAndDelete({ _id: userId });
    res.send("User deleted successfully!");
  } catch (err) {
    res.send("error are getting!");
  }
});

// findByIdAndUpdate Method to Update({currentData},{updateData})
// Any other data, which is not part of schema, ingore by database!
// only Schema Database connection is updated!
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  console.log(data);
  try {
    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
    });
    res.send("User updated successfully!");
  } catch (err) {
    res.send("error are getting!");
  }
});

// step-1 priority to connect database
// step-2 then run our server using express js
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
