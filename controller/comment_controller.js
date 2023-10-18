const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = async function(req, res) {
    try{
        // console.log(req.body);
        let posts = await Post.findById(req.body.post);
        // console.log(posts);
        if(posts) {
            const comment =  await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            // await comment.save();

            posts.comments.push(comment);
            // console.log(posts);
            await posts.save();
            res.redirect('/');
        }
    } catch(err) {
        console.log(err);
    }
}

module.exports.destroy = async function(req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (!comment || comment.user != req.user.id) {
            return res.redirect('back');
        }
        await Comment.findByIdAndDelete(comment.id);
        let post = await Post.findById(comment.post);
        post.comments.pull({
            _id: comment.id
        });
        return res.redirect('back');
    }catch (err) {
        console.log(err);
    }
}