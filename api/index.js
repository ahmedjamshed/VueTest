const express = require("express");
const router = express.Router();
var serviceAccount = require("./adminKey.json");
var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-firebase-app.firebaseio.com",
});
const adminUid = process.env.VUE_APP_ADMIN_UID;

const isAuthorized = async (req, res, next) => {
  try {
    const user = admin.auth().verifyIdToken(req.headers.authorization || "");
    if (user.uid === adminUid) {
      return next();
    } else {
      throw "Not authorized! Go back!";
    }
  } catch (e) {
    var err = new Error(e.message);
    console.log(e.message);
    err.status = 401;
    return next(err);
  }
};
router.get("/", isAuthorized, async (req, res) => {
  const result = await admin.auth().listUsers();
  const users = result.users.map((user) => ({
    email: user.email,
    uid: user.uid,
  }));
  res.json(users);
});

router.post("/", isAuthorized, async (req, res) => {
  try {
    console.log(req.body, "dasd");
    const { email, password } = req.body;
    const user = await admin.auth().createUser({
      email,
      password,
    });
    console.log(user);
    res.json({
      email,
      uid: user.uid,
    });
  } catch (e) {
    var err = new Error(e.message);
    err.status = 401;
    return res.json(err);
  }
});
module.exports = router;
