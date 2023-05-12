import { IUserDocument, IUserPopulated } from '../../models/user/types';
import { ISkillDB } from '../../models/skill/types';


export interface IUserProfile extends IUserPopulated {
    name:  IUserDocument['name'];
    email:  IUserDocument['email'];
    birth_date:  IUserDocument['birth_date'];
    work_date:  IUserDocument['work_date'];
    phone:  IUserDocument['phone'];
    address: IUserDocument['address'];
}

export interface IUpdateProfileRequest {
    personal?: {
        name?: string;
        birth_date?: string;
        gender?: string;
    }
    contacts?: {
        address?: string;
        phone?:string;
        underground?: string;
    }
}
