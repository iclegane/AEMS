import { Types, Model, Document } from 'mongoose';


export interface ITokenDB {
    refreshToken: string;
    user: Types.ObjectId;
}

export interface ITokenDocument extends ITokenDB, Document {}

export type ITokenModel = Model<ITokenDocument>
