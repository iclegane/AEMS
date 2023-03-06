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

export interface IUserProfileDto {
    important: {
        employment: Omit<IUserProfile['employment_id'], 'name'> | null;
        post: Omit<IUserProfile['post_id'], 'name'> | null;
        skills: ISkillDB['name'][] | [];
    }
    personal: {
        name: IUserProfile['name'];
        birth_date: IUserProfile['birth_date'];
        work_date: IUserProfile['work_date'];
        gender: Omit<IUserProfile['gender_id'], 'name'> | null;
        post: Omit<IUserProfile['post_id'], 'name'> | null;
    }
    contacts: {
        address: IUserProfile['address'];
        email: IUserProfile['email'];
        phone: IUserProfile['phone'];
        underground: Omit<IUserProfile['underground_id'], 'name'> | null;
    }
}

export interface IUpdateProfileRequest {
    personal?: {
        name?: IUserProfile['name'];
        birth_date?: IUserProfile['birth_date'];
        gender?: IUserProfile['gender_id'];
    }
}
