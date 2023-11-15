const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');
module.exports.index = async function(req, res){
    
    
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
        path:'comments',
        populate: {
            path: 'user'
        }    
    });
    
    return res.status(200).json({
        message: "List of posts",
        posts: posts
    });
}


module.exports.destroy = async function (req, res) {
    try{
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if(!post || post.user != req.user.id){
            return res.status(500).json({
                message:"You are not allowed to delete this post"
            });
        }
        // console.log(post.id);
        await Post.findByIdAndDelete(post._id);
        await Comment.deleteMany({
            post: req.params.id
        })
        // if (req.xhr) {
        //     return res.status(200).json({ 
        //         data: { 
        //             post_id: req.params.id
        //         },
        //         message: "Post Deleted Successfully"
        //     })
        // }
        // req.flash('success', 'Successfully deleted your post!')

        // return res.redirect('back');
        return res.status(200).json({
            message: "Post and associated comments deleted successfully!"
        });

    }catch(err){
        console.log("err", err);
        return res.status(500).json({
            message:"Internal Server Error"
        });
    } 

}