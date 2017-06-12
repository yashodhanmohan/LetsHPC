'use strict';

import mongoose from 'mongoose';

let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let nameRegex = /^[a-z ,.'-]+$/i;
let usernameRegex = /^[A-Za-z0-9]+(?:[_][A-Za-z0-9]+)*$/

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: nameRegex
    },
    username: {
        type: String,
        required: true,
        unique: true,
        validate: usernameRegex
    },
    password: {
        type: String,
        required: true
    },
    affiliationNumber: {
        type: String,
        required: function() {
            return this.role!="IND";
        }
    },
    instituteId: {
        type: String
    },
    primaryEmailId: {
        type: String,
        required: true,
        unique: true,
        validate: function() {
            return this.primaryEmailId==this.instituteEmailId || this.primaryEmailId==this.personalEmailId;
        }
    },
    instituteEmailId: {
        type: String,
        required: function() {
            return this.role=="STU" || this.role=="INS";
        },
        validate: emailRegex
    },
    personalEmailId: {
        type: String,
        required: function() {
            return this.role=="IND"
        },
        validate: emailRegex
    },
    role: {
        type: String,
        enum: ["INS", "STU", "IND"]
    }
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
