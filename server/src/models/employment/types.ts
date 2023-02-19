import {Types, Model, Document} from "mongoose";


export interface IEmploymentDB {
    name: string;
}

export interface IEmploymentDocument extends IEmploymentDB, Document {}

export interface IEmploymentModel extends Model<IEmploymentDocument> {}