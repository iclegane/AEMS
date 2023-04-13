import SkillModel from '../../models/skill/SkillModel.js';
import SkillDto from '../../dtos/SkillDto/SkillDto.js';
 

class SkillService {
    async getAllPosts(): Promise<SkillDto[]> {
        const skills = await SkillModel.find().exec();
        
        return skills.map((skill) => new SkillDto(skill));
    }
}

export default new SkillService();
