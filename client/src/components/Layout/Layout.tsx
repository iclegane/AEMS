import React from "react";
import Sidebar from "@components/Sidebar/Sidebar";
import "./index.scss";

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <div className="layout">
                <div className="layout__left-panel">
                    <Sidebar/>
                </div>
                <div className="layout__window">
                    <div className="layout__top-panel"></div>
                    <div className="layout__content">
                        { children }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout;
