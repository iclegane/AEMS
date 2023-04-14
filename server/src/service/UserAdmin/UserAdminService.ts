import moment from 'moment';
import UserModel from '../../models/user/UserModel.js';
import ApiError from '../../exceptions/ApiError.js';
import PostModel from '../../models/post/PostModel.js';
import RoleModel from '../../models/role/RoleModel.js';
import SkillModel from '../../models/skill/SkillModel.js';
import GenderModel from '../../models/gender/GenderModel.js';
import UndergroundModel from '../../models/underground/UndergroundModel.js';
import PostDto from '../../dtos/PostDto/PostDto.js';
import RoleDto from '../../dtos/RoleDto/RoleDto.js';
import GenderDto from '../../dtos/GenderDto/GenderDto.js';
import SkillDto from '../../dtos/SkillDto/SkillDto.js';
import UndergroundDto from '../../dtos/UndergroundDto/UndergroundDto.js';
import {IRoleDocument} from '../../models/role/types';
import {IPostDocument} from '../../models/post/types';
import {ISkillDocument} from '../../models/skill/types';
import {IGenderDocument} from '../../models/gender/types';
import {IUndergroundDocument} from '../../models/underground/types';
import {DATE_FORMAT} from '../../utils/constants.js';


interface UserInfoDto {
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
}

class UserAdminService {
    getUserByID = async (id: string): Promise<UserInfoDto> => {
        const user = await UserModel.findById(id)
            .populate<{role_id: IRoleDocument}>({path: 'role_id', model: RoleModel})
            .populate<{post: IPostDocument}>({path: 'post', model: PostModel})
            .populate<{skill: ISkillDocument[]}>({ path: 'skill', model: SkillModel })
            .populate<{gender: IGenderDocument}>({path: 'gender', model: GenderModel})
            .populate<{underground: IUndergroundDocument}>({path: 'underground', model: UndergroundModel})
            .exec();
        ;

        if (!user || !user.id) throw ApiError.BadRequest('User not found');

        const userInfo: UserInfoDto = {
            id: user.id as string,
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            birth_date: moment(user.birth_date).format(DATE_FORMAT),
            work_date: moment(user.work_date).format(DATE_FORMAT),
            post: user.post ? new PostDto(user.post) : null,
            role: user.role_id ? new RoleDto(user.role_id) : null,
            gender: user.gender ? new GenderDto(user.gender) : null,
            skill: user.skill.length ? user.skill.map((el) => new SkillDto(el)) : [],
            underground: user.underground ? new UndergroundDto(user.underground) : null,
        };

        return userInfo;
    };
}

export default new UserAdminService();
