import React from 'react';
import Layout from '@layouts/DashboardLayout';
import './index.scss';
import { Outlet } from 'react-router-dom';

export const SystemMainPage: React.FC = () => {
    return (
        <div className="page page--system">
            <Layout>
                <Outlet/>
            </Layout>
        </div>
    );
};
