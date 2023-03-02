import React, {Dispatch} from 'react';
import './index.scss';
import Icon from '../Icon';
import {IPaginationItem, PaginationItem} from './PaginationItem/PaginationItem';


export interface IPagination {
    page: number;
    pages: number;
    setPage: Dispatch<React.SetStateAction<number>>
}

const createItems = (page: number, pages: number): IPaginationItem[] => {
    return Array.from({length: pages},(v, i) => {return ++i;}).map((number) => {
        return {
            number,
            isActive: number === page,
        };
    });
};

export const Pagination: React.FC<IPagination> = (props) => {

    const {page, setPage, pages} = props;

    const to = (page: IPaginationItem['number']) => {
        setPage(page);
    };

    const prev = () => {
        setPage((prevState) => {
            return (prevState - 1 < 1) ? prevState: prevState - 1;
        });
    };

    const next = () => {
        setPage((prevState) => {
            return (prevState + 1 > pages) ? prevState: prevState + 1;
        });
    };

    const items = createItems(page, pages);

    return(
        <div className='pagination'>
            <div className="pagination__list">
                <button
                    disabled={page === 1}
                    onClick={prev}
                    type="button"
                    className="button button--icon pagination__btn pagination__btn--prev">
                    <Icon name="arrow"/>
                </button>

                {items && items.map((item, index) => {
                    return <PaginationItem
                        key={`PaginationItem-${index}`}
                        isActive={item.isActive}
                        number={item.number}
                        callback={to}
                    />;
                })}

                <button
                    disabled={page === pages}
                    onClick={next}
                    type="button"
                    className="button button--icon pagination__btn pagination__btn--next">
                    <Icon name="arrow"/>
                </button>
            </div>
        </div>
    );
};
