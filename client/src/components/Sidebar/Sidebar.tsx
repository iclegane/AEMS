import React from 'react';
import DashboardMenu from '@components/DashboardMenu';
import './index.scss';
// @ts-ignore
import LogoPath from '@assets/icons/logo.svg';


export const Sidebar: React.FC = () => (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__logo">
                    <img src={LogoPath} alt="logo"/>
                </div>
            </div>
            <div className="sidebar__body">
                <DashboardMenu/>
            </div>
            <div className="sidebar__footer" />
        </div>
    );
