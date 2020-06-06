const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

dotenv.config();

//import routes
const authRoute = require("./routes/auth");

//connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(`Connected to DB!`);
  }
);

//Middleware
app.use(express.json());

//Route Middlewares
app.use("/api/user", authRoute);

app.listen(process.env.WEB_PORT, () =>
  console.log(`Listening on PORT ${process.env.WEB_PORT}...`)
);
