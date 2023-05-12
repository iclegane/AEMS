import RoleModel from '../../models/role/RoleModel.js';
import RoleDto from '../../dtos/RoleDto/RoleDto.js';


class RoleService {
    list = async () => {
        const roles = await RoleModel.find().exec();
        
        return roles.map((role) => new RoleDto(role));
    };
}

export default new RoleService();
