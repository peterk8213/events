//

const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const helmet = require("helmet");
const connectDB = require("./db/connect");

app.use(express.json());
app.use(helmet());

//
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
app.use(morgan("dev"));

// Middleware to parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

///////  jwt verification middleware
const { authenticateUser } = require("./middleware/authentication");

// Apply authenticateUser globally for all routes except login and signup
app.use(authenticateUser);

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

const AuthRouter = require("./routes/auth/user_auth");
app.use("/api/v1/auth", AuthRouter);

///// events route /////

const EventsRouter = require("./routes/events/event-route");
app.use("/api/v1/events", EventsRouter);

//////  user route  //////

const UserRouter = require("./routes/users/user-router");
app.use("/api/v1/user", UserRouter);

start();
