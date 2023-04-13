import {Types} from 'mongoose';
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
            .populate<{gender: IGenderDocument}>({
                path: 'gender',
                select: 'id name',
                model: GenderModel
            })
            .populate<{employment_id: IEmploymentDocument}>({
                path: 'employment_id',
                select: 'id name',
                model: EmploymentModel
            })
            .populate<{post: IPostDocument}>({
                path: 'post',
                select: 'id name',
                model: PostModel
            })
            .populate<{role_id: IRoleDocument}>({
                path: 'role_id',
                select: 'id name',
                model: RoleModel
            })
            .populate<{skill: ISkillDocument[]}>({
                path: 'skill',
                select: 'id name',
                model: SkillModel
            })
            .populate<{underground: IUndergroundDocument}>({
                path: 'underground',
                select: 'id name',
                model: UndergroundModel
            });
        if (!user) throw ApiError.BadRequest('User not found');

        return new ProfileDto(user);
    }

    async updateProfileData(id: string, data: IUpdateProfileRequest): Promise<undefined> {
        
        const {personal, contacts} = data;
        const update: {
            gender?: Types.ObjectId,
            name?: string,
            birth_date?: string
            address?: string,
            phone?: string,
            underground?: string,
        } = {};

        if (personal?.gender) {
            const gender = await GenderModel.findOne({
                name: personal.gender,
            }).select('_id');

            if (gender?.id) update.gender = gender.id as Types.ObjectId;
        }

        if (personal?.name) {
            update.name = personal.name;
        }

        if (personal?.birth_date) {
            update.birth_date = personal.birth_date;
        }

        if (contacts?.address) {
            update.address = contacts.address;
        }

        if (contacts?.phone) {
            update.phone = contacts.phone;
        }

        if (contacts?.underground) {
            update.underground = contacts.underground;
        }

        // todo: add check for ids
        await UserModel.findByIdAndUpdate(id, update);

        return undefined;
    }
}

export default new ProfileService();
