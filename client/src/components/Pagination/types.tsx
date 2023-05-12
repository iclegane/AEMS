import React, { Dispatch } from 'react';


export interface IPagination {
    page: number;
    pages: number;
    setPage: Dispatch<React.SetStateAction<number>>
}
