const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const { registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //data validation
  const { error } = registerValidation(req.body);
  if (error && error.length)
    return res.status(400).send(error.details[0].message);

  //check if the user is in the DB
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send(`Email already is registered`);
  
  ///hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", (req, res) => {
  res.status(200).send({
    success: true,
  });
});

module.exports = router;
