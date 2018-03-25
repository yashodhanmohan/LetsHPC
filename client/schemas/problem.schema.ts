import DbObject from './DbObject.schema';

export default interface ProblemSchema extends DbObject {
    name: string,
    desc: string,
    category_id: string[]
}