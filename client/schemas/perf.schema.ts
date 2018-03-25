import DbObject from './DbObject.schema';

export default interface PerfSchema extends DbObject {
    approach_id: string;
    machine_id: string;
    run_id: number;
    n: number;
    p: number;
    cycles : number;
	instructions : number;
	cacheReferences : number;
	cacheMisses : number;
	busCycles : number;
	L1DcacheLoads : number;
	L1DcacheLoadMisses : number;
	L1DcacheStores : number;
	dTLBLoads : number;
	dTLBLoadMisses : number;
	LLCLoads : number;
	LLCLoadMisses : number;
	LLCStores : number;
	branches : number;
	branchMisses : number;
	contextSwitches : number;
	cpuMigrations : number;
	pageFaults : number;
	L1DcachePrefetchMisses : number;
	LLCPrefetches : number;
}