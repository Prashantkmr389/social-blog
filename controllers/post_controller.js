const Post = require('../models/post');

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