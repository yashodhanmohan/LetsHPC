import DbObject from './DbObject.schema';

export default interface CategorySchema extends DbObject {
    name: string;
    desc: string;
}
