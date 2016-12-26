'use strict';

import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    affiliation: Number,
    password: String,
    position: String
});

export default mongoose.model('User', UserSchema);
