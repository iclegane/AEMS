import React from 'react';
import DashboardLayout from '@layouts/DashboardLayout';
import './index.scss';
import { Outlet } from 'react-router-dom';
import {IPage} from "../../../models/IPage";


export interface SystemMainPage extends IPage{}

export const SystemMainPage: React.FC<SystemMainPage> = () => {
    return (
        <div className="page page--system">
            <DashboardLayout>
                <Outlet/>
            </DashboardLayout>
        </div>
    );
};
