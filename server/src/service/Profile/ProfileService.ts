import UserModel from '../../models/user/UserModel.js';
import GenderModel from '../../models/gender/GenderModel.js';
import EmploymentModel from '../../models/employment/EmploymentModel.js';
import PostModel from '../../models/post/PostModel.js';
import RoleModel from '../../models/role/RoleModel.js';
import SkillModel from '../../models/skill/SkillModel.js';
import UndergroundModel from '../../models/underground/UndergroundModel.js';
import ApiError from '../../exceptions/ApiError.js';
import {IUpdateProfileRequest} from './types';
import {IGenderDocument} from '../../models/gender/types';
import {IEmploymentDocument} from '../../models/employment/types';
import {IPostDocument} from '../../models/post/types';
import {IRoleDocument} from '../../models/role/types';
import {ISkillDocument} from '../../models/skill/types';
import {IUndergroundDocument} from '../../models/underground/types';
import ProfileDto from '../../dtos/ProfileDto/ProfileDto.js';


class ProfileService {
    async getProfileData(id: string): Promise<ProfileDto> {
        const user = await UserModel.findById(id)
            .populate<{gender_id: IGenderDocument}>({
                path: 'gender_id',
                select: 'id name',
                model: GenderModel
            })
            .populate<{employment_id: IEmploymentDocument}>({
                path: 'employment_id',
                select: 'id name',
                model: EmploymentModel
            })
            .populate<{post_id: IPostDocument}>({
                path: 'post_id',
                select: 'id name',
                model: PostModel
            })
            .populate<{role_id: IRoleDocument}>({
                path: 'role_id',
                select: 'id name',
                model: RoleModel
            })
            .populate<{skill_ids: ISkillDocument[]}>({
                path: 'skill_ids',
                select: 'id name',
                model: SkillModel
            })
            .populate<{underground_id: IUndergroundDocument}>({
                path: 'underground_id',
                select: 'id name',
                model: UndergroundModel
            });
        if (!user) throw ApiError.BadRequest('User not found');

        return new ProfileDto(user);
    }

    async updateProfileData(id: string, data: IUpdateProfileRequest): Promise<undefined> {
        
        const {personal, contacts} = data;

        await UserModel.findByIdAndUpdate(id, {
            ...personal,
            ...contacts,
        });

        return undefined;
    }
}

export default new ProfileService();
