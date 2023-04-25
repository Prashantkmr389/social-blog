const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req, res){
    try {
        console.log(req.body);


        let likeable;
        let deleted = false;
        if(req.body.type == 'Post'){
            likeable = await Post.findById(req.body.id).populate('likes');
            

        }else{
            likeable = await Comment.findById(req.body.id).populate('likes');
        }
        
        console.log(req.body.id, req.body.type, req.user.id)
        
        // check if a like already exists

        let existingLike = await Like.findOne({
            likeable: req.body.id,
            onModel: req.body.type,
            user: req.user._id
        })

        // console.log(existingLike)
        if(existingLike){
            console.log('if')
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.deleteOne();
            deleted = true;
        }else{
            console.log('else')
            // make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.body.id,
                onModel: req.body.type

            })
            likeable.likes.push(newLike._id);
            likeable.save();
            // req.flash('success', 'Liked!');
            
        }

    } catch (error) {
        console.log(error, 'error in like controller');
        return;
    }
    return res.redirect('back')
}