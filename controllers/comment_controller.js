const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            if(req.xhr){
                console.log('xhr in comment controller')
                comment = await comment.populate('user')
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment created!"
                });
            }
            req.flash('success', 'Comment published!');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('Error', err);
        return;
    }
}


module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let PostId = comment.post;
            comment.deleteOne();
            let post = await Post.findByIdAndUpdate(PostId, { $pull: {comments: req.params.id}});

            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({likeable:comment._id, onModel:'Comment'})
            req.flash('success', 'Comment deleted!');
        }
        else{
            req.flash('error', 'Unauthorized');
        }
    }
    catch(err){
        console.log('Error', err);
        return;
    }
    return res.redirect('back');
}