'use strict';

import mongoose from 'mongoose';

var MachineSchema = new mongoose.Schema({
    machine_file: String,
    architecture: String,
    cpu_opmode: String,
    byte_order: String,
    cpu_count: Number,
    threads_per_core: Number,
    cores_per_socket: Number,
    socket_count: Number,
    numa_node_count: Number,
    vendor_id: String,
    cpu_family: String,
    model: String,
    model_name: String,
    stepping: Number,
    cpu_mhz: Number,
    cpu_max_mhz: Number,
    cpu_min_mhz: Number,
    bogomips: Number,
    virtualization: String,
    L1d_cache: String,
    L1i_cache: String,
    L2_cache: String,
    L3_cache: String,
    flags: String,
    spec_file_link: String
});

export default mongoose.model('Machine', MachineSchema, 'machines');
