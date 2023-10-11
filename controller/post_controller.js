const Post = require('../models/posts');

module.exports.create = function(req, res){
    try {
        Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    } catch(e) {
        console.log(`Error creating post : ${e}`);
    }
}