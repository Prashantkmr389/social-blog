const User = require('../models/user');
const Post = require('../models/post');
const fs = require('fs');
const path = require('path');
const Friendship = require('../models/friendship');
const Comment = require('../models/comment');
const Like = require('../models/like');
const Chat = require('../models/chat');
const commentsMailer = require("../mailers/comments_mailer");
const nodeMailer = require("../config/nodemailer");
const crypto = require("crypto");
const resetPasswordMailer = require("../mailers/reset_password_mailer");

const queue = require("../config/kue");
const commentEmailWorker = require("../workers/comment_email");


module.exports.home = async function(req, res){
    try{
        // console.log(req.user)
        let friends;
        if(req.user){
          friends = await Friendship.find({from_user : req.user._id}).populate('to_user')
        }
        
        let users = await User.find({});
        let posts = await Post.find({})
          .sort("-createdAt")
          .populate("user")
          .populate({
            path: "comments",
            populate: {
              path: "user",
            },
            options: { sort: { createdAt: -1 } },
          })
        let chats = await Chat.find({}).populate('sender')
        return res.render('home', {
            title: "Home",
            people: users,
            posts : posts,
            all_friends: friends,
            chats : chats
        });
    }
    catch(err){
        console.log('Error', err);
        return;
    }
}