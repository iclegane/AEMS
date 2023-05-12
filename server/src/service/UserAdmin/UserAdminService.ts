import UserModel from '../../models/user/UserModel.js';
import ApiError from '../../exceptions/ApiError.js';
import PostModel from '../../models/post/PostModel.js';
import RoleModel from '../../models/role/RoleModel.js';
import SkillModel from '../../models/skill/SkillModel.js';
import GenderModel from '../../models/gender/GenderModel.js';
import UndergroundModel from '../../models/underground/UndergroundModel.js';
import { IRoleDocument } from '../../models/role/types';
import { IPostDocument } from '../../models/post/types';
import { ISkillDocument } from '../../models/skill/types';
import { IGenderDocument } from '../../models/gender/types';
import { IUndergroundDocument } from '../../models/underground/types';
import UserInfoDto from '../../dtos/UserInfoDto/UserInfoDto.js';
import { ICreateUserRequestData, IUpdateUserRequestData } from '../../types/IUserApi';



class UserAdminService {
    getUserByID = async (id: string): Promise<UserInfoDto> => {
        const user = await UserModel.findById(id)
            .populate<{role_id: IRoleDocument}>({ path: 'role_id', model: RoleModel })
            .populate<{post: IPostDocument}>({ path: 'post', model: PostModel })
            .populate<{skill: ISkillDocument[]}>({ path: 'skill', model: SkillModel })
            .populate<{gender: IGenderDocument}>({ path: 'gender', model: GenderModel })
            .populate<{underground: IUndergroundDocument}>({ path: 'underground', model: UndergroundModel })
            .exec();
        ;

        if (!user || !user.id) throw ApiError.BadRequest('User not found');

        return new UserInfoDto(user);
    };

    updateUserByID = async (id: string, data: IUpdateUserRequestData): Promise<UserInfoDto> => {
        const { post, role, gender, skill, underground } = data;

        const [postExists, roleExists, genderExists, skillExists, undergroundExists] = await Promise.all([
            PostModel.exists({ _id: post }),
            RoleModel.exists({ _id: role }),
            GenderModel.exists({ _id: gender }),
            SkillModel.exists({ _id: { $in: skill } }),
            UndergroundModel.exists({ _id: underground })
        ]);

        if (!postExists) {
            throw ApiError.BadRequest('Invalid post ID');
        }

        if (!roleExists) {
            throw ApiError.BadRequest('Invalid role ID');
        }

        if (!genderExists) {
            throw ApiError.BadRequest('Invalid gender ID');
        }

        if (!skillExists) {
            throw ApiError.BadRequest('Invalid skill ID');
        }

        if (!undergroundExists) {
            throw ApiError.BadRequest('Invalid underground ID');
        }

        const updatedData = await UserModel
            .findByIdAndUpdate({ _id: id }, data,{ strict: true, new: true })
            .populate<{role_id: IRoleDocument}>({ path: 'role_id', model: RoleModel })
            .populate<{post: IPostDocument}>({ path: 'post', model: PostModel })
            .populate<{skill: ISkillDocument[]}>({ path: 'skill', model: SkillModel })
            .populate<{gender: IGenderDocument}>({ path: 'gender', model: GenderModel })
            .populate<{underground: IUndergroundDocument}>({ path: 'underground', model: UndergroundModel })
            .exec();

        if (!updatedData) {
            throw ApiError.BadRequest(`Error update user ${id}`);
        }

        return new UserInfoDto(updatedData);
    };

    createUser = async (data: ICreateUserRequestData): Promise<UserInfoDto> => {
        const { name, email, password, post, role, skill } = data;

        const [emailExist, postExists, roleExists, skillExists] = await Promise.all([
            UserModel.exists({ email }),
            PostModel.exists({ _id: post }),
            RoleModel.exists({ _id: role }),
            SkillModel.exists({ _id: { $in: skill } }),
        ]);

        if (emailExist) {
            throw ApiError.BadRequest('email has Exist');
        }

        if (!postExists) {
            throw ApiError.BadRequest('Invalid post ID');
        }

        if (!roleExists) {
            throw ApiError.BadRequest('Invalid role ID');
        }

        if (!skillExists) {
            throw ApiError.BadRequest('Invalid gender ID');
        }

        const createdUser = await UserModel.create({
            name,
            email,
            password,
            post,
            role_id: role,
            skill
        });

        if (!createdUser) {
            throw ApiError.BadRequest(`Failed to create user with email: ${email}`);
        }

        return this.getUserByID(createdUser.id as string);
    };
}

export default new UserAdminService();
