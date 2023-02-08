import React from 'react';
import Sidebar from '@components/Sidebar';
import Topbar from '@components/Topbar';
import './index.scss';

interface Props {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="dashboard-layout">
            <div className="dashboard-layout__left-panel">
                <Sidebar/>
            </div>
            <div className="dashboard-layout__window">
                <div className="layout__top-panel">
                    <Topbar/>
                </div>
                <div className="dashboard-layout__content">
                    { children }
                </div>
            </div>
        </div>
    );
};
