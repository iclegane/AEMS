import React from 'react';
import './index.scss';
import Page from '../../../components/Page';


interface FilesPageProps {
    title: string;
}

export const FilesPage: React.FC<React.PropsWithChildren<FilesPageProps>> = ({ title }) => (
        <Page title={title}>
            <div className="files gap-30">
                <div className="dashboard-content-block" />
            </div>
        </Page>
    );
