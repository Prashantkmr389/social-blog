const User = require('../models/users');
const Post = require('../models/posts');

module.exports.home = async function(req, res){
    try{
        let users = await User.find({});
        let posts = await Post.find({}).populate('user');
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