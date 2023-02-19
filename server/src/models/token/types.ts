import {Types, Model, Document} from "mongoose";


export interface ITokenDB {
    refreshToken: string;
    user: Types.ObjectId;
}

export interface ITokenDocument extends ITokenDB, Document {}

export interface ITokenModel extends Model<ITokenDocument> {}