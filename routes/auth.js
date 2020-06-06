const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //data validation
  const { error } = registerValidation(req.body);
  if (error && error.length)
    return res.status(400).send(error.details[0].message);

  //check if the user is in the DB
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send(`Email already is registered`);

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({
      user: user._id,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  //data validation
  const { error } = loginValidation(req.body);
  if (error && error.length)
    return res.status(400).send(error.details[0].message);

  //check if the user is in the DB
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send(`Wrong email or password`);

  //check password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send(`Wrong email or password`); 

  res.send('Logged In!');
});

module.exports = router;
