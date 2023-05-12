import { Dispatch, SetStateAction } from 'react';
import { ISort } from '../../models/ISort';


export interface ISortPanel {
    sortManager: {
        sort: ISort | null
        setSort: Dispatch<SetStateAction<ISort | null>>
    }
}
