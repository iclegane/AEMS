import { Model, Document } from 'mongoose';


export interface IPostDB {
    name: string;
}

export interface IPostDocument extends IPostDB, Document {}

export type IPostModel = Model<IPostDocument>
