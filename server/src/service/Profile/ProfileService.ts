import UserModel from '../../models/user/UserModel.js';
import {IUserPopulated} from '../../models/user/types';
import GenderModel from '../../models/gender/GenderModel.js';
import EmploymentModel from '../../models/employment/EmploymentModel.js';
import PostModel from '../../models/post/PostModel.js';
import RoleModel from '../../models/role/RoleModel.js';
import SkillModel from '../../models/skill/SkillModel.js';
import UndergroundModel from '../../models/underground/UndergroundModel.js';
import ApiError from '../../exceptions/ApiError.js';
import {IUserProfile, IUserProfileDto} from './types';


class ProfileService {
    async getProfileData(id: string) {
        const selectOptions = ['name', 'email', 'birth_date', 'work_date', 'phone', 'address', 'role_id', 'gender_id', 'employment_id', 'post_id', 'role_id', 'skill_ids', 'underground_id'];
        const user: (IUserProfile | null) = await UserModel.findById(id).select(selectOptions.join(' '))
            .populate<Pick<IUserPopulated, 'gender_id'>>({
                path: 'gender_id',
                select: 'id name',
                model: GenderModel
            })
            .populate<Pick<IUserPopulated, 'employment_id'>>({
                path: 'employment_id',
                select: 'id name',
                model: EmploymentModel
            })
            .populate<Pick<IUserPopulated, 'post_id'>>({
                path: 'post_id',
                select: 'id name',
                model: PostModel
            })
            .populate<Pick<IUserPopulated, 'role_id'>>({
                path: 'role_id',
                select: 'id name',
                model: RoleModel
            })
            .populate<Pick<IUserPopulated, 'skill_ids'>>({
                path: 'skill_ids',
                select: 'id name',
                model: SkillModel
            })
            .populate<Pick<IUserPopulated, 'underground_id'>>({
                path: 'underground_id',
                select: 'id name',
                model: UndergroundModel
            });
        if (!user) throw ApiError.BadRequest('User not found');

        const ProfileDto: IUserProfileDto = {
            important: {
                employment: user.employment_id?.name || null,
                post: user.post_id?.name || null,
                skills: user.skill_ids.map((el) => el.name)
            },
            personal: {
                name: user.name,
                birth_date: user.birth_date,
                work_date: user.work_date,
                gender: user.gender_id?.name || null,
                post: user.post_id?.name || null
            },
            contacts: {
                address: user.address,
                email: user.email,
                phone: user.phone,
                underground: user.underground_id?.name || null
            }
        };

        return ProfileDto;
    }
}

export default new ProfileService();
