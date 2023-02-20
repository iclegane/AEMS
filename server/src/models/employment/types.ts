import {Model, Document} from 'mongoose';


export interface IEmploymentDB {
    name: string;
}

export interface IEmploymentDocument extends IEmploymentDB, Document {}

export type IEmploymentModel = Model<IEmploymentDocument>
