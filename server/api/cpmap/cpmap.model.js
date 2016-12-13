'use strict';

import mongoose from 'mongoose';

var CpmapSchema = new mongoose.Schema({
    cpmap_problem_id: Number,
    cpmap_category_id: Number
});

export default mongoose.model('Cpmap', CpmapSchema);
