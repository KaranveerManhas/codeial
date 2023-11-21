const Like = require('../models/like');
const Comment = require('../models/comments');
const Post = require('../models/posts');


module.exports.toggleLike = async function(req, res){
    try{
        // likes/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        // if a like already exists then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            await likeable.save();

            await Like.deleteOne(existingLike);
            deleted = true;
        }else{
            // else make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            await likeable.likes.push(newLike._id);
            await likeable.save();
        }
        return res.status(200).json({
            message: "Request Successful",
            data: {
                deleted: deleted
            }
        })
    }catch(err){
        console.log("Error in toggleLike module: ", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}