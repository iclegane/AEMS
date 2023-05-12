import { IRoleDocument } from '../../models/role/types.js';


class RoleDto {
    id: string;

    name: string;

    constructor(roleModel: IRoleDocument) {
        this.id = roleModel.id as string;
        this.name = roleModel.name;
    }
}

export default RoleDto;
