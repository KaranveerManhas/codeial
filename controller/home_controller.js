const Post = require('../models/posts');

module.exports.home = async function(req, res) {
    // console.log(req.cookies);
    // Change the value of cookie
    // res.cookie('cookie_name', new cookie value);
    try {
        let posts = await Post.find({}).populate('user').populate({
            path:'comments',
            populate: {
                path: 'user'
            }    
        });
        // console.log(posts);
        return res.render('home', {
            title:'Home',
            posts: posts
        });
    } catch (err) {
        console.log("Error getting posts from database", err);
    }
}


// module.exports.actionName = function(req, res) {}