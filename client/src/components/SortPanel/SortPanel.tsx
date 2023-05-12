import React, { useState } from 'react';
import SortPanelItem, { ISortItem } from './SortPanelItem';
import { ISortPanel } from './types';
import './index.scss';


const INITIAL_SORT_ITEMS: ISortItem[] = [
    {
        field: 'index',
        name: '#',
        isSortable: false,
        type: null
    },{
        field: 'name',
        name: 'Имя',
        isSortable: true,
        type: null
    },{
        field: 'createAt',
        name: 'Дата начала',
        isSortable: true,
        type: null
    },{
        field: 'deadline',
        name: 'Крайний срок',
        isSortable: true,
        type: null
    },{
        field: 'status',
        name: 'Статус',
        isSortable: true,
        type: null
    },{
        field: 'manager',
        name: 'Постановщик',
        isSortable: false,
        type: null
    }];

export const SortPanel: React.FC<ISortPanel> = (props) => {

    const { sort, setSort } = props.sortManager;

    const [sortItems] = useState<ISortItem[]>(
        INITIAL_SORT_ITEMS.map((item) => {
            item.type = null;
            if (item.field === sort?.field) item.type = sort?.type;

            return item;
        })
    );

    return(
        <div className="sort-panel">
            <div className="flex justify-content-sb align-items-c">
                {sortItems.map(({ name, field, isSortable, type }) => (
                    <SortPanelItem
                        key={name}
                        name={name}
                        field={field}
                        isSortable={isSortable}
                        type={type}
                        setSort={setSort}
                    />
                ))}
            </div>
        </div>
    );
};
