import React from 'react';
import './index.scss';
import Task from '@components/Task';
import {sortTypes, useGetTasksQuery} from '../../../api/tasks';
import SortPanel from '../../../components/SortPanel';
import Pagination from '../../../components/Pagination';
import Page from '../../../components/Page';
import {Skeleton} from "antd";


export interface ISort {
    field: string;
    type: sortTypes;
}

interface TasksPageProps {
    title: string;
}

export const TasksPage: React.FC<TasksPageProps> = ({ title }) => {
    const [page, setPage] = React.useState(1);
    const [limit] = React.useState(5);
    const [sort, setSort] = React.useState<ISort | null>(null);

    const handleSetSort = React.useCallback((newSort: ISort | null) => {
        setSort(newSort);
    }, []);

    const { data: tasksData, isLoading: isTasksLoading } = useGetTasksQuery({
        page,
        limit,
        sort,
    });

    const tasks = tasksData?.tasks ?? [];

    const renderedTasks = React.useMemo(
        () =>
            tasks.map((task, index) => (
                <Task
                    id={task.id}
                    key={task.id + index}
                    index={index + 1}
                    name={task.name}
                    created={task.created}
                    deadline={task.deadline}
                    status={task.status || ''}
                    manager={task.manager || ''}
                />
            )),
        [tasks]
    );

    return (
        <Page title={title}>
            <div className="tasks">
                {!tasks.length && (
                    <div className="dashboard-content-block">
                        <div>Задач нет</div>
                    </div>
                )}
                <Skeleton loading={isTasksLoading}>
                    {/*// @ts-ignore*/}
                    <SortPanel sortManager={{ sort, setSort: handleSetSort }} />
                </Skeleton>
                <Skeleton loading={isTasksLoading}>
                    {renderedTasks}
                </Skeleton>
                <Skeleton loading={isTasksLoading}>
                    <Pagination page={page} pages={tasksData?.totalPage ?? 0} setPage={setPage} />
                </Skeleton>
            </div>
        </Page>
    );
}
