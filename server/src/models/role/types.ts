import {Types, Model, Document} from "mongoose";


export interface IRoleDB {
    name: string;
}

export interface IRoleDocument extends IRoleDB, Document {}

export interface IRoleModel extends Model<IRoleDocument> {}