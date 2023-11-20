const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    accessToken: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

const ResetPassword = mongoose.model('resetPassword', resetPasswordSchema);

module.exports = ResetPassword;