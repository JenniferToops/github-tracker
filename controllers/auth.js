const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  console.log("[postLogin]", req.body.email, req.body.password);
  const validationErrors = [];

  console.log("here");

  if (!validator.isEmail(req.body.email)) {
    validationErrors.push({ msg: "Please enter a valid email address." });
    console.log("Email not valid");
  } else {
    console.log("Email validated");
  }
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  console.log(`validation errors length: ${validationErrors.length}`);
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(info);
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = (req, res, next) => {
  console.log(
    "[postSignup]",
    req.body.email,
    req.body.githubUsername,
    req.body.password,
    req.body.confirmPassword
  );
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) {
    console.log("Email is invalid");
    validationErrors.push({ msg: "Please enter a valid email address." });
  } else {
    console.log("Email is valid");
  }
  if (!validator.isLength(req.body.password, { min: 8 })) {
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  } else {
    console.log("Password is valid");
  }
  if (req.body.password !== req.body.confirmPassword) {
    validationErrors.push({ msg: "Passwords do not match" });
  } else {
    console.log("password and confirmPassword match");
  }

  if (validationErrors.length) {
    console.log("validation errors");
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  } else {
    console.log("No validation errors");
  }

  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    githubUsername: req.body.githubUsername,
    email: req.body.email,
    password: req.body.password,
  });

  console.log(user);

  User.findOne(
    {
      $or: [
        { email: req.body.email },
        { githubUsername: req.body.githubUsername },
      ],
    },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        console.log("existing user");
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("/login");
      }
      console.log("user will be saved");
      user.save((err) => {
        console.log("user.save() cb");
        if (err) {
          console.log(err);
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          console.log("redirecting");
          res.redirect("/login");
        });
      });
    }
  );
};
