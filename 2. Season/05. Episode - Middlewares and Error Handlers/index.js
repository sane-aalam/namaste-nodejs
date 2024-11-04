const express = require("express");
const app = express();

// Note-1
// Suppose you are not handing the request, but you have more rounter function,
// then how do you fix this?
// using next() -> function
// next() called next rounter hander
// next function which pass as paramter (res,req,next)

app.use(
  "/",
  (req, res, next) => {
    console.log("Handling rounter-1 in express");
    res.send("Handling rounter-1 in express");
    next();
  },
  (res, req, next) => {
    console.log("Handling rounter-1 in express");
    res.send("Handling rounter-1 in express");
    next();
  },
  (res, req) => {
    res.send("Handing rounter-3 in expressjs");
  }
);

app.listen(5000);
