'use strict';

import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    affiliation: Number,
    password: String,
    position: String
});

UserSchema.methods.authenticate = function(password, callback) {
    if (this.password == password) {
        callback(null, true);
    }
    else {
        callback(true, null);
    }
};

export default mongoose.model('User', UserSchema);
