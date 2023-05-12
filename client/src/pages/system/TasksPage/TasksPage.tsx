import React from 'react';
import './index.scss';
import Page from '../../../components/Page';
import { PageProps } from '../../../models/IPage';
import TasksTable from '../../../components/Tables/TasksTable';

 
export const TasksPage: React.FC<PageProps> = ({ title }) => (
        <Page title={title}>
            <div className="tasks">
                <TasksTable/>
            </div>
        </Page>
    );
