import {Types, Model, Document} from 'mongoose';
import {IRoleDocument} from '../role/types';
import {IEmploymentDocument} from '../employment/types';
import {IUndergroundDocument} from '../underground/types';
import {IGenderDocument} from '../gender/types';
import {IPostDocument} from '../post/types';
import {ISkillDocument} from '../skill/types';


export interface IUserDB {
    name: string | null;
    email: string;
    password: string;
    isActivated: boolean;
    emailActivationLink: string | null;
    birth_date: Date | null;
    work_date: Date;
    phone: string | null;
    address: string | null;
    vacation_count: number | null;
    role_id: Types.ObjectId;
    gender: Types.ObjectId | null;
    underground: Types.ObjectId | null;
    employment_id: Types.ObjectId | null;
    post: Types.ObjectId | null;
    skill: Types.ObjectId[] | [];
}

export interface IUserPopulated {
    role_id: IRoleDocument;
    gender: IGenderDocument | null;
    underground: IUndergroundDocument | null;
    employment_id: IEmploymentDocument | null;
    post: IPostDocument | null;
    skill: ISkillDocument[] | [];
}

export interface IUserDocument extends IUserDB, Document {}
export type IUserModel = Model<IUserDocument>
