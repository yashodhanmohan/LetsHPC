'use strict';

import mongoose from 'mongoose';

var MachineSchema = new mongoose.Schema({
    machine_id: Number,
    machine_file: String
});

export default mongoose.model('Machine', MachineSchema);
