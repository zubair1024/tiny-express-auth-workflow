const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/private", verify, (req, res) => {
  res.send(`HELLO THERE!`);
});
