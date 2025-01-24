const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        unique: true, 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
    },
    password: { 
        type: String, 
        required: true, 
    },
    bio: { 
        type: String, 
        default: '', 
    },
    posts: [{
        type: Schema.Types.ObjectId, 
        ref: 'Blog', 
    }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;