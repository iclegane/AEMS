import UndergroundModel from '../../models/underground/UndergroundModel.js';
import UndergroundDto from '../../dtos/UndergroundDto/UndergroundDto.js';


class UndergroundService {
    list = async () => {
        const undergrounds = await UndergroundModel.find() ?? [];

        return undergrounds.map((underground) => new UndergroundDto(underground));
    };
}

export default new UndergroundService();
