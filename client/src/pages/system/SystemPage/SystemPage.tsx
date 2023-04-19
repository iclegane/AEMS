import React from 'react';
import { Outlet, useOutlet } from 'react-router-dom';
import MainPage from '../MainPage';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { PageProps } from '../../../models/IPage';
import Notification from '../../../components/Notification';
import './index.scss';


export const SystemPage: React.FC<PageProps> = ({ title }) => {

    const outlet = useOutlet();

    return (
        <div className="page page--system">
            <DashboardLayout>
                {outlet ? <Outlet/> :
                    <MainPage title={title}/>
                }
            </DashboardLayout>
            <Notification/>
        </div>
    );
};
