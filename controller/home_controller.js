const Post = require('../models/posts');
const User = require('../models/users');
const Friendship = require('../models/friendship');

module.exports.home = async function(req, res) {
    // console.log(req.cookies);
    // Change the value of cookie
    // res.cookie('cookie_name', new cookie value);
    try {
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }  
        }).populate('comments').populate('likes');
        // console.log(posts);
        let users = await User.find({}).populate('friends');
        let friends = await Friendship.find({}).populate('receiver');
        friends.map(friend => console.log(friend.receiver));
        return res.render('home', {
            title:'Home',
            posts: posts,
            all_users: users,
            all_friends: friends
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