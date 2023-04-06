import React from 'react';
import './index.scss';
import Page from '../../../components/Page';
import { PageProps } from '../../../models/IPage';


export const MainPage: React.FC<React.PropsWithChildren<PageProps>> = ({ title }) => (
        <Page title={title}>
            <div className="users gap-30">
                <div className="dashboard-content-block">
                    Main Page content
                </div>
            </div>
        </Page>
    );
