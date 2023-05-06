const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  accessToken: {
    type: String,
    required: true,
  },
  expired: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 36000,
  },
});

const TokenID = mongoose.model('TokenID', tokenSchema);

module.exports = TokenID;
// Compare this snippet from models\user.js:

