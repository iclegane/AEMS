import {Model, Document} from 'mongoose';


export interface ISkillDB {
    name: string;
}

export interface ISkillDocument extends ISkillDB, Document {}

export type ISkillModel = Model<ISkillDocument>
