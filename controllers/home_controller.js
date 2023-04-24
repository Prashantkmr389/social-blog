const User = require('../models/user');
const Post = require('../models/post');

module.exports.home = async function(req, res){
    try{
        let users = await User.find({});
        let posts = await Post.find({})
        .sort('-createdAt').
        populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })

        return res.render('home', {
            title: "Home",
            people: users,
            posts : posts
        });
    }
    catch(err){
        console.log('Error', err);
        return;
    }
}