import React, {useState} from 'react';
import './index.scss';
import Task from '@components/Task';
import {v4 as uuidv4} from 'uuid';
import {sortTypes, useGetTasksQuery} from '../../../api/tasks';
import SortPanel from '../../../components/SortPanel';
import Pagination from '../../../components/Pagination';
import Page from '../../../components/Page';


export interface ISort {
    field: string;
    type: sortTypes;
}

interface TasksProps {
    title: string;
}

export const TasksPage: React.FC<React.PropsWithChildren<TasksProps>> = ({ title, children, ...rest }) => {

    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [sort, setSort] = useState<ISort | null>(null);


    const { data, isLoading } = useGetTasksQuery({
        page,
        limit,
        sort
    });

    if (isLoading) {
        return <div>loading</div>;
    }

    if (!data) {
        return <div>Not found</div>;
    }

    return (
        <Page title={title}>
            <div className="tasks">
                {!data && <div>Задач нет</div>}

                <SortPanel sortManager={{sort,setSort}}/>

                {data.tasks && data.tasks.map((task, index) =>
                    {return <Task
                        id={task.id}
                        key={uuidv4()}
                        index={++index}
                        name={task.name}
                        created={task.created}
                        deadline={task.deadline}
                        status={task.status || ''}
                        manager={task.manager || ''}
                    />;}
                )}

                <Pagination
                    page={page}
                    pages={data.totalPage}
                    setPage={setPage}
                />
            </div>
        </Page>
    );
};
