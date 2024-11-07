const express = require("express");
const app = express();
const connectDB = require("./config/database");
const port = 7777;
const User = require("./Modles/user.js");
const { object } = require("zod");

app.use(express.json());

// create modle using Schema
app.post("/signup", async (req, res) => {
  // send the data dynamiclly using postman
  const user = new User(req.body);
  try {
    await user.save();
    res.send("The user is added successfully!");
  } catch (err) {
    res.send("error saving into user" + err.msg);
  }
});

// bluid API to search emailId
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

app.get("/feed", async (req, res) => {
  // Try and Catch Must Set-up
  try {
    const data = await User.find({});
    res.send(data);
  } catch (err) {
    res.send("error saving into user", err, msg);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const data = await User.findByIdAndDelete({ _id: userId });
    res.send("User deleted successfully!");
  } catch (err) {
    res.send("error are getting!");
  }
});

// only Schema Database connection is updated!
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    // Logic
    // only you can update these all things,
    // not possible to change emailID,UserName
    const ALLOWED_UPDATES = ["about", "gender", "age", "skills", "photoUrl"];
    const isUpdateAllowed = Object.keys(data).every((k) => {
      ALLOWED_UPDATES.includes(k);
    });

    if (!isUpdateAllowed) {
      throw new Error("Updated is not allowed!");
    }

    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    res.send("User updated successfully!");
  } catch (err) {
    res.send("Failed Update");
  }
});

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
