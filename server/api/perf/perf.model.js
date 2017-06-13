
'use strict';

import mongoose from 'mongoose';

var PerfSchema = new mongoose.Schema({
    approach_id: String,
    machine_id: String,
    run_id: Number,
    n: Number,
    p: Number,
    cycles : Number,
	instructions : Number,
	cacheReferences : Number,
	cacheMisses : Number,
	busCycles : Number,
	L1DcacheLoads : Number,
	L1DcacheLoadMisses : Number,
	L1DcacheStores : Number,
	dTLBLoads : Number,
	dTLBLoadMisses : Number,
	LLCLoads : Number,
	LLCLoadMisses : Number,
	LLCStores : Number,
	branches : Number,
	branchMisses : Number,
	contextSwitches : Number,
	cpuMigrations : Number,
	pageFaults : Number,
	L1DcachePrefetchMisses : Number,
	LLCPrefetches : Number

});

export default mongoose.model('Perf', PerfSchema, 'perfs');