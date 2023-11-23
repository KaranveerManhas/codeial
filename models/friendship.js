const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},{
    timestamps: true
});

const Friendship = mongoose.model('friendship', friendshipSchema);

module.exports = Friendship;