import UserModel from '../../models/user/UserModel.js';
import ApiError from '../../exceptions/ApiError.js';
import PostModel from '../../models/post/PostModel.js';
import RoleModel from '../../models/role/RoleModel.js';
import SkillModel from '../../models/skill/SkillModel.js';
import GenderModel from '../../models/gender/GenderModel.js';
import UndergroundModel from '../../models/underground/UndergroundModel.js';
import {IRoleDocument} from '../../models/role/types';
import {IPostDocument} from '../../models/post/types';
import {ISkillDocument} from '../../models/skill/types';
import {IGenderDocument} from '../../models/gender/types';
import {IUndergroundDocument} from '../../models/underground/types';
import UserInfoDto from '../../dtos/UserInfoDto/UserInfoDto.js';
import {IUpdateUserRequestData} from '../../types/IUserApi';



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

        return new UserInfoDto(user);
    };

    updateUserByID = async (id: string, data: IUpdateUserRequestData): Promise<UserInfoDto> => {
        const {post, role, gender, skill, underground} = data;

        const [postExists, roleExists, genderExists, skillExists, undergroundExists] = await Promise.all([
            PostModel.exists({ _id: post }),
            RoleModel.exists({ _id: role }),
            GenderModel.exists({ _id: gender }),
            SkillModel.exists({ _id: { $in: skill } }),
            UndergroundModel.exists({ _id: underground })
        ]);

        if (!postExists) {
            throw new Error('Invalid post ID');
        }

        if (!roleExists) {
            throw new Error('Invalid role ID');
        }

        if (!genderExists) {
            throw new Error('Invalid gender ID');
        }

        if (!skillExists) {
            throw new Error('Invalid skill ID');
        }

        if (!undergroundExists) {
            throw new Error('Invalid underground ID');
        }

        const updatedData = await UserModel
            .findByIdAndUpdate({_id: id}, data,{ strict: true, new: true })
            .populate<{role_id: IRoleDocument}>({path: 'role_id', model: RoleModel})
            .populate<{post: IPostDocument}>({path: 'post', model: PostModel})
            .populate<{skill: ISkillDocument[]}>({ path: 'skill', model: SkillModel })
            .populate<{gender: IGenderDocument}>({path: 'gender', model: GenderModel})
            .populate<{underground: IUndergroundDocument}>({path: 'underground', model: UndergroundModel})
            .exec();

        if (!updatedData) {
            throw new Error(`User with id ${id} not found`);
        }

        return new UserInfoDto(updatedData);
    };
}

export default new UserAdminService();
