const Post = require('../models/posts');

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
    }
    catch(err){
        console.log('Error', err);
        return;
    }
    return res.redirect('back');
}