import React, { Dispatch, SetStateAction } from 'react';
import { ISortItem } from './types';
import { ISort, sortTypes } from '../../../models/ISort';


export const SortPanelItem: React.FC<ISortItem & { setSort: Dispatch<SetStateAction<ISort | null>> }> = ({
  field,
  name,
  isSortable,
  type,
  setSort,
}) => {

    const toggleSortType = (type: sortTypes | null): sortTypes => (type === 'asc' ? 'desc' : 'asc');

    const clickHandler = () => {
        setSort({ field, type: toggleSortType(type) });
    };

    return(
        <div className={`sort-panel__field sort-panel__field--${field}`}>
            {isSortable ? (
                <button
                    type="button"
                    onClick={clickHandler}
                    className={`button button--text sort-panel__item ${type ? `sort-panel__item--${type}` : ''}`}
                >
                    {name}
                </button>
            ) : (
                <span className="sort-panel__item sort-panel__item--not-sortable">{name}</span>
            )}
        </div>
    );
};
