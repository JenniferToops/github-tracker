const Post = require("../models/Post");

module.exports = {
    getIndex: async (req,res)=>{
        // res.render('index.ejs')
     console.log("user: ", req.user);
        try {
            // console.log("id: ", req.user.id);
            const postItems = await Post.find()
            console.log(postItems);
            res.render("index.ejs", { posts: postItems.reverse(), user: req.user });
        } catch (err) {
            console.log(err);
        }

    }
}