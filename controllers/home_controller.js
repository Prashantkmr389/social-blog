const User = require('../models/users');

module.exports.home = async function(req, res){
    try{
        let users = await User.find({});
        return res.render('home', {
            title: "Home",
            people: users
        });
    }
    catch(err){
        console.log('Error', err);
        return;
    }
}