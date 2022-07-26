const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;

// We are using our packages here
app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(cors());

//You can use this to check if your server is working
app.get("/", (req, res) => {
  res.send("Welcome to your server");
});

//Route that handles login logic
app.post("/notes", (req, res) => {
  console.log("Notes details below->");
  console.log("Note Title: " + req.body.addTitle);
  console.log("Note Content: " + req.body.addTxt);
  res.send();
});

//Start your server on a specified port
app.listen(port, () => {
  console.log(
    `Server is runing on port ${port}. Visit -> http://127.0.0.1:${port}`
  );
});
