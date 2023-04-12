import {IUndergroundDocument} from '../../models/underground/types.js';


class UndergroundDto {
    name: string;

    constructor(undergroundModel: IUndergroundDocument) {
        this.name = undergroundModel.name;
    }
}

export default UndergroundDto;
