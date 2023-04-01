import React from 'react';
import './index.scss';
import Page from '../../../components/Page';


interface UsersPageProps {
    title: string;
}

export const MainPage: React.FC<React.PropsWithChildren<UsersPageProps>> = ({ title, children, ...rest }) => {
    return (
        <Page title={title}>
            <div className="users gap-30">
                <div className="dashboard-content-block">
                    Main Page content
                </div>
            </div>
        </Page>
    );
};
