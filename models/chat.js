const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    message : {
        type : String,
        required : true
    },
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, {
    timestamps : true
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
