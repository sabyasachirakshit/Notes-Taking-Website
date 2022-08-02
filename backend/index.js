const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;
const path = require("path");

var passwordDB = [
  { username: "abc", password: "123" },
  { username: "def", password: "456" },
  { username: "ghi", password: "789" },
];

const staticPath = path.join(__dirname, "../");
app.use(express.static(staticPath));

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
app.post("/login", authentication, (req, res) => {
  res.sendFile(path.join(staticPath, "/notes.html"));
});

function authentication(req, res, next) {
  var rendered = false;
  let username = req.body.username;
  let password = req.body.password;
  for (let i = 0; i < passwordDB.length; i++) {
    if (passwordDB[i].username == username) {
      if (passwordDB[i].password == password) {
        rendered = true;
        next();
      } else {
        res.send("Password not maching. Please try again!");
      }
    }
  }
  if (rendered === false) {
    res.send(`<p>Username with ${username} does not exists! Click here to sign up
  </p>
  <a href='http://127.0.0.1:5500/backend/signup_page.html'>Create a New Account!</a>`);
  }
}

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let newUser = { username: username, password: password };
  passwordDB.push(newUser);
  res.send(
    'User successfully created! Click here to Log in <a href="http://127.0.0.1:5500/backend/login_page.html">Login to Notes Website</a>'
  );
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
