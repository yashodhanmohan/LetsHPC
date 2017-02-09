'use strict';

import mongoose from 'mongoose';

var NumberSchema = new mongoose.Schema({
    approach_id: String,
    machine_id: String,
    run_id: Number,
    n: Number,
    p: Number,
    e2eS: Number,
    algS: Number,
    e2eNS: Number,
    algNS: Number
});

export default mongoose.model('Number', NumberSchema);
