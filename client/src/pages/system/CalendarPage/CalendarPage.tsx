import React from 'react';
import './index.scss';
import Page from "../../../components/Page";


interface CalendarPageProps {
    title: string;
}

export const CalendarPage: React.FC<React.PropsWithChildren<CalendarPageProps>> = ({ title, children, ...rest }) => {
    return (
        <Page title={title}>
            <div className="calendar gap-30">
                <div className="dashboard-content-block">
                </div>
            </div>
        </Page>
    );
};
