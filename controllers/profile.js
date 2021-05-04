// module.exports = {
//     getProfile: (req,res)=>{
//         res.render('profile.ejs', {posts: postItems, user: req.user})
//     }
// }

const Post = require("../models/Post");

module.exports = {
    getProfile: async (req,res)=>{
        // res.render('profile.ejs')
     console.log("user: ", req.user);
        try {
            // console.log("id: ", req.user.id);
            const postItems = await Post.find()
            console.log(postItems);
            res.render("profile.ejs", { posts: postItems.reverse(), user: req.user });
        } catch (err) {
            console.log(err);
        }

    }
}