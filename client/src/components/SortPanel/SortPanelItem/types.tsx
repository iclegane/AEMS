import {sortTypes} from '../../../api/tasks';


export interface ISortItem {

    field: string;
    name: string;
    isSortable: boolean;
    type: sortTypes | null;
}
