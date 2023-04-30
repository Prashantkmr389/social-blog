const mongoose = require('mongoose')

const friendship = new mongoose.Schema({
    from_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref :'User'
    },
    to_user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, {
    timestamps : true
})

const Freindship = mongoose.model('Friendship', friendship)

module.exports = Freindship