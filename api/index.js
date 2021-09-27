const express = require("express");
const router = express.Router();
var serviceAccount = require("./adminKey.json");
var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const adminUid = process.env.VUE_APP_ADMIN_UID;

const isAuthorized = async (req, res, next) => {
  try {
    const user = await admin
      .auth()
      .verifyIdToken(req.headers.authorization || "");

    if (user.uid === adminUid) {
      return next();
    } else {
      throw "Not authorized! Go back!";
    }
  } catch (e) {
    var err = new Error(e.message);
    console.log(e);
    err.status = 401;
    return next(err);
  }
};
router.get("/", isAuthorized, async (req, res) => {
  const result = await admin.auth().listUsers();
  const users = result.users
    .map((user) => ({
      email: user.email,
      uid: user.uid,
    }))
    .filter(({ uid }) => uid !== adminUid);
  res.json(users);
});

router.post("/", isAuthorized, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await admin.auth().createUser({
      email,
      password,
    });
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

router.delete("/:id", isAuthorized, async (req, res) => {
  try {
    const { id } = req.params;
    await admin.auth().deleteUser(id);
  } catch (e) {
    var err = new Error(e.message);
    err.status = 401;
    return res.json(err);
  }
});
module.exports = router;
