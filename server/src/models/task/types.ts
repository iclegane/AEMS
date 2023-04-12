import {Model, Document, Types} from 'mongoose';
import {ITaskStatusDB, ITaskStatusDocument} from './status/types.js';
import {IUserDB, IUserDocument} from '../user/types.js';


export interface ITaskDB {
    name: string;
    description: string;
    body: JSON;
    deadline: Date;
    status: Types.ObjectId;
    performer: Types.ObjectId;
    manager: Types.ObjectId;
}

export interface ITaskPopulate {
    status: {
        id: ITaskStatusDocument['id'];
        name: ITaskStatusDB['name'];
    } | null;
    manager: {
        id: IUserDocument['id'];
        name: IUserDB['name'];
    } | null;
    performer: {
        id: IUserDocument['id'];
        name: IUserDB['name'];
    } | null;
}

export interface ITaskDocument extends ITaskDB, Document {}

export type ITaskModel = Model<ITaskDocument>
