import {Types, Model, Document} from "mongoose";


export interface ISkillDB {
    name: string;
}

export interface ISkillDocument extends ISkillDB, Document {}

export interface ISkillModel extends Model<ISkillDocument> {}