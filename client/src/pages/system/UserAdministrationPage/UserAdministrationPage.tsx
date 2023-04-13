import React from 'react';
import Page from '../../../components/Page';
import './index.scss';
import { PageProps } from '../../../models/IPage';


export const UserAdministrationPage: React.FC<PageProps> = ({ title }) => {


    return (
        <Page title={title}>
            123
        </Page>
    );
};
