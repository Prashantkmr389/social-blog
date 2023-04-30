const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req, res){
    try{
        if(req.body.content == ""){
            req.flash('error', 'Post cannot be empty')
            return res.redirect('back');
        }
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            console.log('xhr in post controller')
            post = await post.populate('user')
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }
        req.flash('success', 'Post published!');
    }
    catch(err){
        console.log('Error', err);
        return;
    }
    return res.redirect('back');
}

module.exports.destroy = async function(req, res){
   
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            // delete likes
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            // delete comments
            var comments = await Comment.find({post: req.params.id});
            for(let comment of comments){
                await Like.deleteMany({likeable: comment, onModel: 'Comment'});
            }
            await Comment.deleteMany({post: req.params.id});
            
            post.deleteOne();
            if(req.xhr){
                console.log('xhr in post controller')
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted!"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');
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