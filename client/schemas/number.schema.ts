import DbObject from './DbObject.schema';

export default interface Number extends DbObject {
    approach_id: string,
    machine_id: string,
    run_id: number,
    n: number,
    p: number,
    e2eS: number,
    algS: number,
    e2eNS: number,
    algNS: number
}