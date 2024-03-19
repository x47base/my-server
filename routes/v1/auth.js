const express = require("express");
const sessions = require("express-session");
const apiurl = "http://localhost:450"
const fetch = (...args) => import('node-fetch').then(({
  default: fetch
}) => fetch(...args));

const router = express.Router();

// Get User Details users.roblox.com/v1/users/:userid

router.use(sessions({
  secret: "hd32OLIZRND39OF2wqunfi23r09142upeifue9jdwvoflou0r3ht2f0nceqr3f2pfwoen",
  resave: true,
  saveUninitialized: true
}));

router.post("/login", async (req, res) => {
  var session;
  const {
    username, password
  } = req.body;

  session = req.session;
  session.authToken = cookie;
  session.userid = 0;

  fetch(`${apiurl}/api/v1/users/${session.userid}`, {
    method: "POST"
  }).then(res => res.json())
  .then(res => {
    console.log(res)
  })
  res.sendStatus(200)
});

router.get("/login-status", (req, res) => {
  if (req.session.authToken) {
    res.send({
      status: true
    })
  } else {
    res.status(401).send("You must be logged in to access this information");
  }
});

router.get("/user-info", async (req, res) => {
  if (req.session.authToken) {
    const userInfo = {
      
    };
    res.send(JSON.stringify(userInfo));
  } else {
    res.status(401).send("You must be logged in to access this information");
  }
});

router.get("/user-id", async (req, res) => {
  if (req.session.authToken) {
    const userInfo = {};
    res.send(JSON.stringify(userInfo));
  } else {
    res.status(401).send("You must be logged in to access this information");
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send('An error occurred while logging out');
    } else {
      res.send(JSON.stringify({success:true}));
    }
  });
});

module.exports = router;