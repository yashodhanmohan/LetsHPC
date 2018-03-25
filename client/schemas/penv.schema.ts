import DbObject from './DbObject.schema';

export default interface PenvSchema extends DbObject {
    name: string;
    desc: string;
}