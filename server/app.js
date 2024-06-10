//

const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connect");

app.use(express.json());

//
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
app.use(morgan("dev"));

// Middleware to parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//////  starting the app   //////

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

///////   routes   ///////

// authentication route //

const AuthRouter = require("./routes/user_auth");
app.use("/api/v1/auth", AuthRouter);

start();
