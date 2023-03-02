import {Dispatch, SetStateAction} from 'react';
import {ISort} from '../../pages/system/TasksPage/TasksPage';


export interface ISortPanel {
    sortManager: {
        sort: ISort | null
        setSort: Dispatch<SetStateAction<ISort | null>>
    }
}
