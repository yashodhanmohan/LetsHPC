'use strict';

import mongoose from 'mongoose';

var PenvSchema = new mongoose.Schema({
    name: String,
    desc: String
});

export default mongoose.model('Penv', PenvSchema);
