const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },
});

UserSchema.method('toJSON', function() {
    const {__v, _id, password, ...user} = this.toObject();
    user.id = _id;
    return user;
});

module.exports = model('User', UserSchema);