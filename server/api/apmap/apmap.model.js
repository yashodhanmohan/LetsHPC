'use strict';

import mongoose from 'mongoose';

var ApmapSchema = new mongoose.Schema({
    apmap_problem_id: Number,
    apmap_approach_id: Number,
    apmap_approach_desc : String
});

export default mongoose.model('Apmap', ApmapSchema);
