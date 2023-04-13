import React from 'react';
import Page from '../../../components/Page';
import './index.scss';
import { PageProps } from '../../../models/IPage';
import { useParams } from 'react-router-dom';


export const UserAdministrationPage: React.FC<PageProps> = ({ title }) => {
    const { id } = useParams();


    return (
        <Page title={title}>
            123
        </Page>
    );
};
