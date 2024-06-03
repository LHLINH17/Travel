const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: Number, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        access_token: { type: String },
        refresh_token: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
