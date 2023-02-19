import {Types, Model, Document} from "mongoose";


export interface IGenderDB {
    name: string;
}

export interface IGenderDocument extends IGenderDB, Document {}

export interface IGenderModel extends Model<IGenderDocument> {}