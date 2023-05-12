import { sortTypes } from '../../../models/ISort';


export interface ISortItem {

    field: string;
    name: string;
    isSortable: boolean;
    type: sortTypes | null;
}
