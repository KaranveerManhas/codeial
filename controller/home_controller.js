const Post = require('../models/posts');
const User = require('../models/users');

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
        let users = await User.find({});

        return res.render('home', {
            title:'Home',
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.log("Error getting posts from database", err);
    }
}


// module.exports.actionName = function(req, res) {}

// Promise and then usage
// Post.find({}).populate('comments').then(function());
// let posts = Post.find({}).populate('comments');
// posts.then();