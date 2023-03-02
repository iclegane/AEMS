import React, {useState} from 'react';
import './index.scss';
import Task from '@components/Task';
import {sortTypes, useGetTasksQuery} from '../../../api/tasks';
import SortPanel from '../../../components/SortPanel';
import Pagination from '../../../components/Pagination';


export interface ISort {
    field: string;
    type: sortTypes;
}

export const TasksPage: React.FC = () => {

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
        <div className="tasks">
            {!data && <div>Задач нет</div>}

            <SortPanel sortManager={{sort,setSort}}/>

            {data.tasks && data.tasks.map((task, index) =>
                {return <Task
                    id={task._id}
                    key={task._id}
                    index={++index}
                    name={task.name}
                    createdAt={task.createdAt}
                    deadline={task.deadline}
                    status={task.statusID.name}
                    manager={task.managerID?.name || null}
                />;}
            )}

            <Pagination
                page={page}
                pages={data.totalPage}
                setPage={setPage}
            />
        </div>
    );
};
