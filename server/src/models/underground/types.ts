import {Types, Model, Document} from "mongoose";


export interface IUndergroundDB {
    name: string;
}

export interface IUndergroundDocument extends IUndergroundDB, Document {}

export interface IUndergroundModel extends Model<IUndergroundDocument> {}