const Post = require('../models/posts');
const Comment = require('../models/comments');
const Like = require('../models/like');

module.exports.create = async function(req, res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message:"Post created!"
            });
        }

        req.flash('success', "Post Created");
        return res.redirect('back');

    } catch(e) {
        req.flash('error', e);
        console.log(`Error creating post : ${e}`);
        return res.redirect('back');
    }
}


module.exports.destroy = async function (req, res) {
    try{
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        
        if(post.user == req.user.id){
            await Like.deleteMany({
                likeable: post,
                onModel: 'Post'
            });
            await Like.deleteMany({
                _id: {$in: post.comments}
            });

            await Post.deleteOne(post);

            await Comment.deleteMany({
                post: req.params.id
            });

            if (req.xhr) {
                return res.status(200).json({ 
                    data: { 
                        post_id: req.params.id
                    },
                    message: "Post Deleted Successfully"
                })
            }
            return res.redirect('back');
        }

        req.flash('error', "You cannot delete this post");
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        console.log('Error deleting post : ', err);
        return res.redirect('back');
    } 

}