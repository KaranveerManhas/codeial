const Comment = require('../models/comments');
const Post = require('../models/posts');
const commentsMailer = require('../mailers/comments_mailers');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');

module.exports.create = async function(req, res) {
    try{
        // console.log(req.body);
        let posts = await Post.findById(req.body.post);
        // console.log(posts);
        if(posts) {
            let comment =  await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            // await comment.save();

            posts.comments.push(comment);
            // console.log(posts);
            await posts.save();
            comment = await comment.populate('user', 'username email');
            // commentsMailer.newComment(comment);
            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log("Error in creating queue", err);
                }
                console.log("Job queued", job.id);
            });

            if (req.xhr){
                return res.status(201).json({
                    data:{
                        comment: comment
                    },
                    message: "Post Created!"
                });
            }
            req.flash('success', "Comment created");
            res.redirect('/');
        }
    } catch(err) {
        req.flash('error', err);
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
        req.flash('success', 'Comment deleted successfully');
        return res.redirect('back');
    }catch (err) {
        req.flash('error', err);
        console.log(err);
    }
}