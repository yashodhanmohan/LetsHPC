import DbObject from './DbObject.schema';

export default interface OrganizationSchema extends DbObject {
    name: string;
    country: string;
}