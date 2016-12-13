'use strict';

import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
    name: String,
    user_id: String,
    affiliation: Number,
    password: String,
    position: String
});

export default mongoose.model('User', UserSchema);
