import {Model, Document} from 'mongoose';


export interface IUndergroundDB {
    name: string;
}

export interface IUndergroundDocument extends IUndergroundDB, Document {}

export type IUndergroundModel = Model<IUndergroundDocument>
