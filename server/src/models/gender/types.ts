import {Model, Document} from 'mongoose';


export interface IGenderDB {
    name: string;
}

export interface IGenderDocument extends IGenderDB, Document {}

export type IGenderModel = Model<IGenderDocument>
