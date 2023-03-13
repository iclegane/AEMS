import moment from 'moment';
import {Replace} from '../../types/utils.js';
import {IUserDocument, IUserPopulated} from '../../models/user/types';
import DATE_FORMAT from '../../utils/constants.js';


type UserDtoPopulated = Replace<IUserDocument, {
    gender_id: IUserPopulated['gender_id'];
    employment_id: IUserPopulated['employment_id'];
    post_id: IUserPopulated['post_id'];
    skill_ids: IUserPopulated['skill_ids'];
    role_id: IUserPopulated['role_id'];
    underground_id: IUserPopulated['underground_id'];
}>

class ProfileDto {
    important;
    
    personal;

    contacts;

    constructor(userModel: UserDtoPopulated) {
        this.important = {
            employment: userModel.employment_id?.name,
            post: userModel.post_id?.name,
            skills: userModel.skill_ids.map((el) => el.name)
        };        
        
        this.personal = {
            name: userModel.name,
            birth_date: userModel.birth_date ? moment(userModel.birth_date).format(DATE_FORMAT) : null,
            work_date: moment(userModel.work_date).format(DATE_FORMAT),
            gender: userModel.gender_id?.name || null,
            post: userModel.post_id?.name || null
        };

        this.contacts = {
            address: userModel.address,
            email: userModel.email,
            phone: userModel.phone,
            underground: userModel.underground_id?.name || null
        };
    }
};

export default ProfileDto;
