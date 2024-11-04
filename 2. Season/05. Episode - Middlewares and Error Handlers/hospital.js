const express = require("express");
const app = express();

// Middleware to parse JSON bodies
// to handle to express.Json body
app.use(express.json());

app.post("/user-healthy-kidney", function (req, res, next) {
  const numberUser = req.body.numberUser;
  const numberKidney = req.body.numberKidney;
  const numberHealthyKidney = req.body.numberHealthyKidney;
  const numberUnHealthyKidney = req.body.numberUnHealthyKidney;

  res.json({
    numberUser,
    numberKidney,
    numberHealthyKidney,
    numberUnHealthyKidney,
  });
  // console.log (simple)
  console.log(numberKidney);
  console.log(numberKidney);
  console.log(numberHealthyKidney);
  console.log(numberUnHealthyKidney);
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
