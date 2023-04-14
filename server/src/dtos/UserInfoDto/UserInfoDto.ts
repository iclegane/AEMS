import moment from 'moment';
import PostDto from '../PostDto/PostDto.js';
import RoleDto from '../RoleDto/RoleDto.js';
import GenderDto from '../GenderDto/GenderDto.js';
import SkillDto from '../SkillDto/SkillDto.js';
import UndergroundDto from '../UndergroundDto/UndergroundDto.js';
import {DATE_FORMAT} from '../../utils/constants.js';
import {IUserDocument, IUserPopulated} from '../../models/user/types';
import {Replace} from '../../types/utils.js';


type UserInfoDtoPopulated = Replace<IUserDocument, {
    role_id: IUserPopulated['role_id'];
    post: IUserPopulated['post'];
    gender: IUserPopulated['gender'];
    underground: IUserPopulated['underground'];
    skill: IUserPopulated['skill'];
}>

class UserInfoDto {
    id: string;

    name: string | null;

    email: string;

    address: string | null;

    phone: string | null;

    birth_date: string | null;

    work_date: string;

    post: PostDto | null;

    role: RoleDto | null;

    gender: GenderDto | null;

    skill: SkillDto[];

    underground: UndergroundDto | null;

    constructor(user: UserInfoDtoPopulated) {
        this.id = user.id as string;
        this.name = user.name;
        this.email = user.email;
        this.address = user.address;
        this.phone = user.phone;
        this.birth_date = moment(user.birth_date).format(DATE_FORMAT);
        this.work_date = moment(user.work_date).format(DATE_FORMAT);
        this.post = user.post ? new PostDto(user.post) : null;
        this.role = user.role_id ? new RoleDto(user.role_id) : null;
        this.gender = user.gender ? new GenderDto(user.gender) : null;
        this.skill = user.skill.length ? user.skill.map((el) => new SkillDto(el)) : [];
        this.underground = user.underground ? new UndergroundDto(user.underground) : null;
    }
}

export default UserInfoDto;
