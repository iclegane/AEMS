import React from "react";
import DashboardMenu from "@components/DashboardMenu";
import "./index.scss";

export const Sidebar: React.FC = () => {
    return (
        <>
            <div className="sidebar">
                <div className="sidebar__header">
                    <div className="sidebar__logo">
                        <img src={require('./../../assets/icons/logo.svg')} alt="logo"/>
                    </div>
                </div>
                <div className="sidebar__body">
                    <DashboardMenu/>
                </div>
                <div className="sidebar__footer"></div>
            </div>
        </>
    )
}
