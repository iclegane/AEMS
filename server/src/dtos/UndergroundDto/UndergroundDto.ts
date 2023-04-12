import {IUndergroundDocument} from '../../models/underground/types.js';


class UndergroundDto {
    id: string;

    name: string;

    constructor(undergroundModel: IUndergroundDocument) {
        this.id = undergroundModel.id as string;
        this.name = undergroundModel.name;
    }
}

export default UndergroundDto;
