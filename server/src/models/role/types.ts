import { Model, Document } from 'mongoose';


export interface IRoleDB {
    name: string;
}

export interface IRoleDocument extends IRoleDB, Document {}

export type IRoleModel = Model<IRoleDocument>
