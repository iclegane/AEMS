import React from 'react';
import './index.scss';
import Task from '@components/Task';
import {sortTypes, useGetTasksQuery} from '../../../api/tasks';
import SortPanel from '../../../components/SortPanel';
import Pagination from '../../../components/Pagination';
import Page from '../../../components/Page';


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
                {isTasksLoading && <div>Loading</div>}
                {!tasks.length && <div>Задач нет</div>}
                {/*// @ts-ignore*/}
                <SortPanel sortManager={{ sort, setSort: handleSetSort }} />
                {renderedTasks}
                <Pagination page={page} pages={tasksData?.totalPage ?? 0} setPage={setPage} />
            </div>
        </Page>
    );
}
