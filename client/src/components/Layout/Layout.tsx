import React from "react";
import Sidebar from "@components/Sidebar";
import Topbar from "@components/Topbar";
import "./index.scss";

interface Props {
    children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <div className="layout">
                <div className="layout__left-panel">
                    <Sidebar/>
                </div>
                <div className="layout__window">
                    <div className="layout__top-panel">
                        <Topbar/>
                    </div>
                    <div className="layout__content">
                        { children }
                    </div>
                </div>
            </div>
        </>
    )
}
