const Post = require('../models/posts');
const Comment = require('../models/comments');

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


module.exports.destroy = async function (req, res) {
    try{
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if(!post || post.user != req.user.id){
            return res.redirect('back');
        }
        // console.log(post.id);
        await Post.findByIdAndDelete(post.id);
        await Comment.deleteMany({
            post: req.params.id
        })
        return res.redirect('back');
    }catch(err){
        console.log('Error deleting post : ', err);
    } 

}