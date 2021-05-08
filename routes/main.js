const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require('../controllers/posts')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// route using controller

router.get("/", homeController.getIndex);
router.get('/profile', ensureAuth, postsController.getPosts)
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/logout", authController.logout);

// module.exports = router;

/////////////////////////

// router.get("/", (request, response) => {
//   console.log("/");
//   response.render("index", { posts: undefined });
// });

// router.get("/login", (request, response) => {
//   console.log("/login");
//   response.render("login");
// });

// router.get("/signup", (request, response) => {
//   console.log("/signup");
//   response.render("signup");
// });

// router.post("/login", (request, response) => {
//   console.log(request.body.email, request.body.password);
//   // response.render('index', {posts: undefined})
//   response.render("login");
// });

// router.post("/signup", (request, response) => {
//   console.log(
//     request.body.email,
//     request.body.githubUsername,
//     request.body.password,
//     request.body.confirmPassword
//   );
//   response.render("signup", { posts: undefined });
// });

// router.get("/profile", (request, response) => {
//   console.log("profile");
//   response.render("profile");
// });

// router.get("/logout", (request, response) => {
//   request.logout();
//   response.redirect("/");
// });

module.exports = router;

// route using controller

// router.get('/', homeController.getIndex)
//
// router.get('login', authController.getLogin)
// router.post('login', authController.postLogin)
//
// router.get('/signup', authController.getSignup)
// router.post('/signup', authController.postLogin)

//module.exports = router;
