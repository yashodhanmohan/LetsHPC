'use strict';

import mongoose from 'mongoose';

var Approach = new mongoose.Schema({
    user_id : [String],
    problem_id: String,
    category_id: String,
    penv_id: String,
    shared_or_distributed: String,
    descS: String,
    descP: String,
    complexityS: String,
    complexityP: String,
    costP: String,
    theo_speed: String,
    estimated_ser_frac: String,
    tub: String,
    mem_acc_l_and_s: String,
    no_of_comp: String,
    tcr_a_proc : String,
    tcr_a_problem : String,
    scr_a : String,
    effcr_a : String,
    kfmc_a : String,
    msapo : String,
    mem_wall_a:String,
    cache_coh_a : String,
    false_sharing_a : String,
    sched_rel_a: String,
    load_bal_a : String,
    sync_a : String,
    granul_a: String,
    scalab_a : String,
    other_a : String,
    diff_faced: String,
    advantage: String,
    disadvantage: String,
    serial_code: String,
    parallel_code: String
});

export default mongoose.model('Approach', Approach);
