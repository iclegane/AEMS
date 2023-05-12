import React, { ReactNode } from 'react';
import { usePageTitle } from '../../hooks/page';


interface PageProps {
    title: string;
    children: ReactNode;
}

export const Page: React.FC<PageProps> = ({ title, children }) => {

    usePageTitle(title);

    return (
        <>
            {children}
        </>
    );
};
