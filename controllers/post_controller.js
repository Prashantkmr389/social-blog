const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success', 'Post published!');
    }
    catch(err){
        console.log('Error', err);
        return;
    }
    return res.redirect('back');
}

module.exports.destroy = async function(req, res){
    console.log('destroy');
    try{
    
        console.log(req.params.id);
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