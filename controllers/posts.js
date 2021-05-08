const Post = require("../models/Post");

module.exports = {
  getPosts: async (req, res) => {
    console.log("user: ", req.user);
    try {
      console.log("id: ", req.user.id);
      const postItems = await Post.find({ userId: req.user.id, userName: req.user.githubUsername });
      console.log(postItems);
      res.render("profile.ejs", { posts: postItems.reverse(), user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    console.log(req.user);
    console.log(req.body)
    try {
      await Post.create({
        repoLink: req.body.repoLink,
        description: req.body.description,
        userId: req.user.id,
        userName: req.user.githubUsername
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },

  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect('/');
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    console.log(req.body.postIdFromJSFile);
    try {
      await Post.findOneAndDelete({ userId: req.user.id,  _id: req.body.postIdFromJSFile });
      console.log("Deleted Post");
      res.json("Deleted It");
      res.redirect('/profile')
    } catch (err) {
      console.log(err);
    }
  },
};
