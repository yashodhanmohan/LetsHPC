'use strict';

import mongoose from 'mongoose';

var CategorySchema = new mongoose.Schema({
    name: String,
    desc: String
});

export default mongoose.model('Category', CategorySchema, 'categories');
