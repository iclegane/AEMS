import React, {Dispatch, SetStateAction} from "react";
import {sortTypes} from "../../../api/tasks";
import {ISort} from "../../../pages/system/TasksPage/TasksPage";

export interface ISortItem {

    field: string;
    name: string;
    isSortable: boolean;
    type: sortTypes | null;
}

export const SortPanelItem: React.FC<ISortItem & {
    setSort: Dispatch<SetStateAction<ISort | null>>
}> = (props) => {

    const {field, name, isSortable, type, setSort} = props;

    const toggleSortType = (type: sortTypes | null): sortTypes => {
        if (!type) return 'asc';

        return type === 'desc' ? 'asc' : 'desc';
    }

    const clickHandler = (field: ISortItem['field'], type: ISortItem["type"]) => {
        const toggleType = toggleSortType(type);
        setSort({
            field,
            type: toggleType
        })
    }

    return(
        <div className={`sort-panel__field sort-panel__field--${field}`}>
            {isSortable &&
                <button
                    type={"button"}
                    onClick={() => clickHandler(field, type)}
                    className={`button button--text sort-panel__item ${type ? `sort-panel__item--${type}` : ''}`}>{name}</button>
            }

            {!isSortable &&
                <span className={'sort-panel__item sort-panel__item--not-sortable'}>{name}</span>
            }
        </div>
    )
}
