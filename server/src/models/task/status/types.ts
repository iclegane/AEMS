import { Model, Document } from 'mongoose';


export interface ITaskStatusDB {
    name: string;
}

export interface ITaskStatusDocument extends ITaskStatusDB, Document {}

export type ITaskStatusModel = Model<ITaskStatusDocument>
