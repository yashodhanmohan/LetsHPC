'use strict';

import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
    name: String,                   // User's name
    username: String,               // Unique username
    password: String,               // Secret password
    affiliationNumber: String,      // If belonging to institute, unique code/number provided by the institute
    instituteId: String,            // Institute ID stored in the institute schema
    primaryEmailId: String,         // Primary email ID to be selected from institute email id or personal email id
    instituteEmailId: String,       // Email ID provided by the institute
    personalEmailId: String,        // Email ID used by the user personally
    role: String                    // "INS","STU","IND" - Role of the user
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
