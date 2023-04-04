import React, {useCallback, useMemo} from 'react';
import Icon from '../Icon';
import PaginationItem, {IPaginationItem} from './PaginationItem';
import {IPagination} from './types';
import './index.scss';


const createItems = (page: number, pages: number): IPaginationItem[] => Array.from({ length: pages }, (_, i) => ({
        number: i + 1,
        isActive: i + 1 === page,
    }));

export const Pagination = React.memo<IPagination>(({ page, setPage, pages }) => {

    const to = useCallback((page: IPaginationItem['number']) => {
        setPage(page);
    }, [setPage]);

    const prev = useCallback(() => {
        setPage((prevState) => prevState - 1 < 1 ? prevState : prevState - 1);
    }, [setPage]);

    const next = useCallback(() => {
        setPage((prevState) => prevState + 1 > pages ? prevState : prevState + 1);
    }, [setPage, pages]);

    const items = useMemo(() => createItems(page, pages), [page, pages]);

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

                {items && items.map((item, index) => <PaginationItem
                        key={`PaginationItem-${index}`}
                        isActive={item.isActive}
                        number={item.number}
                        callback={to}
                    />)}

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
});
