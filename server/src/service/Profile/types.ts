import {IUserDocument, IUserPopulated} from '../../models/user/types';
import {ISkillDB} from '../../models/skill/types';


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
        name?: IUserProfile['name'];
        birth_date?: IUserProfile['birth_date'];
        gender?: IUserProfile['gender_id'];
    }
    contacts?: {
        address?: IUserProfile['address']
        phone?: IUserProfile['phone']
        underground?: IUserProfile['underground_id']
    }
}
