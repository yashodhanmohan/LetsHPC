'use strict';

import mongoose from 'mongoose';

var ProblemSchema = new mongoose.Schema({
    problem_id: Number,
    problem_name: String,
    problem_desc: String
});

export default mongoose.model('Problem', ProblemSchema);
