import moment from 'moment';
import {Replace} from '../../types/utils.js';
import {IUserDocument, IUserPopulated} from '../../models/user/types';
import {DATE_FORMAT} from '../../utils/constants.js';


type UserDtoPopulated = Replace<IUserDocument, {
    gender: IUserPopulated['gender'];
    employment_id: IUserPopulated['employment_id'];
    post: IUserPopulated['post'];
    skill: IUserPopulated['skill'];
    role_id: IUserPopulated['role_id'];
    underground: IUserPopulated['underground'];
}>

class ProfileDto {
    important;
    
    personal;

    contacts;

    constructor(userModel: UserDtoPopulated) {
        this.important = {
            employment: userModel.employment_id?.name,
            post: userModel.post?.name,
            skills: userModel.skill.map((el) => el.name)
        };        
        
        this.personal = {
            name: userModel.name,
            birth_date: userModel.birth_date ? moment(userModel.birth_date).format(DATE_FORMAT) : null,
            work_date: moment(userModel.work_date).format(DATE_FORMAT),
            gender: userModel.gender?.name || null,
            post: userModel.post?.name || null
        };

        this.contacts = {
            address: userModel.address,
            email: userModel.email,
            phone: userModel.phone,
            underground: userModel.underground?.name || null
        };
    }
};

export default ProfileDto;
