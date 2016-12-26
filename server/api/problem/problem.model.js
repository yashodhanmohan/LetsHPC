'use strict';

import mongoose from 'mongoose';

var ProblemSchema = new mongoose.Schema({
    name: String,
    desc: String,
    category_id: String
});

export default mongoose.model('Problem', ProblemSchema);
