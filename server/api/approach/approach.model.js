'use strict';

import mongoose from 'mongoose';

var Approach = new mongoose.Schema({
    user_id: String,
    problem_id: String,
    category_id: String,
    desc: String,
    complexity: String,
    estimated_ser_frac: String,
    diff_faced: String,
    possible_speedup: String,
    advantage: String,
    disadvantage: String,
    serial_code: String,
    parallel_code: String
});

export default mongoose.model('Approach', Approach);
