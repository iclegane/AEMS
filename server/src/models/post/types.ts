import {Types, Model, Document} from "mongoose";


export interface IPostDB {
    name: string;
}

export interface IPostDocument extends IPostDB, Document {}

export interface IPostModel extends Model<IPostDocument> {}