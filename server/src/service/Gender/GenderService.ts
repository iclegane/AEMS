import GenderDto from '../../dtos/GenderDto/GenderDto.js';
import GenderModel from '../../models/gender/GenderModel.js';


class GenderService {
    list = async () => {
        const genders = await GenderModel.find().exec();
 
        return genders.map((gender) => new GenderDto(gender));
    };
}

export default new GenderService();
