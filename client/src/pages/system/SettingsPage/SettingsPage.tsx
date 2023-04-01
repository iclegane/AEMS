import React from 'react';
import './index.scss';
import Page from '../../../components/Page';


interface SettingsPageProps {
    title: string;
}

export const SettingsPage: React.FC<React.PropsWithChildren<SettingsPageProps>> = ({ title, children, ...rest }) => {
    return (
        <Page title={title}>
            <div className="users gap-30">
                <div className="dashboard-content-block" />
            </div>
        </Page>
    );
};
