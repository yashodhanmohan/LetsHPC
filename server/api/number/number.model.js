'use strict';

import mongoose from 'mongoose';

var NumberSchema = new mongoose.Schema({
    user_id: String,
    problem_id: Number,
    category_id: Number,
    approach_id: Number,
    machine_id: Number,
    run_id: Number,
    n: Number,
    p: Number,
    e2eS: Number,
    algS: Number,
    e2eP: Number,
    algP: Number
});

export default mongoose.model('Number', NumberSchema);
