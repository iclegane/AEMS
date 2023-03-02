import React from 'react';
import {IPaginationItem} from './types';


export const PaginationItem: React.FC<IPaginationItem & {
    callback: (item: IPaginationItem['number']) => void;
}> = (props) => {

    const {number, isActive, callback} = props;

    const onClickHandler = () => {
        callback(number);
    };

    return (
        <button
            onClick={onClickHandler}
            className='button'
            disabled={isActive}
        >{number}</button>
    );
};
