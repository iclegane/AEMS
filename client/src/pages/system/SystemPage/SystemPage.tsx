import React from 'react';
import DashboardLayout from '@layouts/DashboardLayout';
import './index.scss';
import { Outlet, useOutlet } from 'react-router-dom';
import MainPage from '../MainPage';
import { PageProps } from '../../../models/IPage';


export const SystemPage: React.FC<PageProps> = ({ title }) => {

    const outlet = useOutlet();

    return (
        <div className="page page--system">
            <DashboardLayout>
                {outlet ? <Outlet/> :
                    <MainPage title={title}/>
                }
            </DashboardLayout>
        </div>
    );
};
