import { IGenderDocument } from '../../models/gender/types';


class GenderDto {
    id: string;

    name: string;

    constructor(genderModel: IGenderDocument) {
        this.id = genderModel.id as string;
        this.name = genderModel.name;
    }
}

export default GenderDto;
