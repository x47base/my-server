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
    async function GetData() {
      await noblox.setCookie(req.session.authToken)
      const user = await noblox.getCurrentUser()
      return {
        username: user.UserName,
        profileImageUrl: user.ThumbnailUrl
      }
    }
    const d1 = GetData()
    res.send({
      status: true
    })
  } else {
    res.status(401).send("You must be logged in to access this information");
  }
});

router.get("/user-info", async (req, res) => {
  if (req.session.authToken) {
    async function GetData() {
      await noblox.setCookie(req.session.authToken)
      const user = await noblox.getCurrentUser()
      const username = user.UserName
      const userId = user.UserID
      var thumbnailUrl = ""
      
      // Use userId to fetch thumbnail URL
      const response = await fetch("https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=" + `${userId}` + "&size=50x50&format=Png&isCircular=false", { method: 'GET' });
      const data = await response.json();
      thumbnailUrl = data.data.at(0).imageUrl;
      
      return { username, thumbnailUrl }
    }
    
    const userInfo = await GetData();
    res.send(JSON.stringify(userInfo));
  } else {
    res.status(401).send("You must be logged in to access this information");
  }
});

router.get("/user-id", async (req, res) => {
  if (req.session.authToken) {
    async function GetData() {
      await noblox.setCookie(req.session.authToken)
      const user = await noblox.getCurrentUser()
      const userId = user.UserID
      
      return { userId }
    }
    
    const userInfo = await GetData();
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