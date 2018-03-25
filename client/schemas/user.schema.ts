import DbObject from './DbObject.schema';

export default interface UserSchema extends DbObject {
    name: string;
    username: string;
    affiliationNumber: string;
    instituteId: string;
    role: string;
}
