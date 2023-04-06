import React from 'react';
import './index.scss';
import Page from '../../../components/Page';
import { PageProps } from '../../../models/IPage';


export const FilesPage: React.FC<React.PropsWithChildren<PageProps>> = ({ title }) => (
        <Page title={title}>
            <div className="files gap-30">
                <div className="dashboard-content-block" />
            </div>
        </Page>
    );
