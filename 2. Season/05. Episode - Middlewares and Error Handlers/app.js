const express = require("express");
const app = express();

// note-1 As you know this all node js code - single line execute one by one,
// note-2 if you don't send any request, server gonna to hangOUT!

app.use("/", function (req, res) {
  res.send("Hello wrold!");
  console.log(
    "Explore how to use middlewares and error handling in Express to manage requests and ensure a smooth user experience"
  );
});

app.listen(5000);
