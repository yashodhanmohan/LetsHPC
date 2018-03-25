import DbObject from './DbObject.schema';

interface Approach extends DbObject{
    // Identification fields
    user_id : string[];
    problem_id: string;
    penv_id: string;
    architecture: string;

    // Content fields
    approach_name : string;
    descS: string;
    descP: string;
    complexityS: string;
    complexityP: string;
    costP: string;
    theo_speed: string;
    estimated_ser_frac: string;
    tub: string;
    mem_acc_l_and_s: string;
    no_of_comp: string;
    tcr_a_proc : string;
    tcr_a_problem : string;
    scr_a : string;
    effcr_a : string;
    kfmc_a : string;
    msapo : string;
    mem_wall_a:string;
    cache_coh_a : string;
    false_sharing_a : string;
    sched_rel_a: string;
    load_bal_a : string;
    sync_a : string;
    granul_a: string;
    scalab_a : string;
    other_a : string;
    diff_faced: string;
    advantage: string;
    disadvantage: string;
    serial_code: string;
    parallel_code: string;
}

export default Approach;