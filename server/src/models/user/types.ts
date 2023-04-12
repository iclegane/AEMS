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
    gender_id: Types.ObjectId | null;
    underground: Types.ObjectId | null;
    employment_id: Types.ObjectId | null;
    post_id: Types.ObjectId | null;
    skill_ids: Types.ObjectId[] | [];
}

export interface IUserPopulated {
    role_id: IRoleDocument;
    gender_id: IGenderDocument | null;
    underground: IUndergroundDocument | null;
    employment_id: IEmploymentDocument | null;
    post_id: IPostDocument | null;
    skill_ids: ISkillDocument[] | [];
}

export interface IUserDocument extends IUserDB, Document {}
export type IUserModel = Model<IUserDocument>
