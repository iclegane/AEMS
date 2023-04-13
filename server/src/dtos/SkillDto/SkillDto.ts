import {ISkillDocument} from '../../models/skill/types';


class SkillDto {
    id: string;
    
    name: string;
    
    constructor(model: ISkillDocument) {
        this.id = model.id as string;
        this.name = model.name;
    }
}

export default SkillDto;
