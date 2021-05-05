const express = require("express");
const app = express();
const connectDB = require("./config/database");
const passport = require("passport");
const mainRouter = require("./routes/main");
const postsRouter = require("./routes/posts");
const profileRouter = require("./routes/profile");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ path: "./config/.env" });
require("./config/passport")(passport);

connectDB();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// sessions //

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

// ///Passport middleware////

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", mainRouter);
app.use("/posts", postsRouter);
app.use("/profile", postsRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
