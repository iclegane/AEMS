import React from 'react';
import './index.scss';
import {useParams} from "react-router-dom";
import {Task, useGetTaskQuery, useUpdateTaskMutation} from "../../../api/tasks";
import FieldList from "../../../components/FieldList";
import {IFieldItem} from "../../../components/FieldList/FieldItem";
import {TaskSelectStatuses} from "../../../components/TaskSelectStatuses/TaskSelectStatuses";


const taskItems = (task: Task): IFieldItem[] => {

    const items = [
        {
            name: 'Дата создания',
            value: task.created,
        },
        {
            name: 'Дедлайн',
            value: task.deadline,
        },
        {
            name: 'Последнее изменение',
            value: task.updated,
        },
        {
            name: 'Статус',
            value: task.status || '',
        },
        {
            name: 'Постановщик',
            value: task.manager || '',
        },
        {
            name: 'Ответственный',
            value: task.performer || '',
        },
    ];

    return items;
}

export const TaskPage: React.FC = () => {

    const { id } = useParams();
    if (!id) return null;

    const [UpdateTask] = useUpdateTaskMutation()

    const {data, isSuccess, isLoading} = useGetTaskQuery(id);
    if (isLoading) return <div>loading...</div>
    if (!isSuccess) return null;

    const onSelectHandle = async (opt: any) => {
        await UpdateTask({
            taskID: id,
            fields: {
                statusID: opt.value
            }
        });
    }

    return (
        <div className='flex flex-column gap-30'>
            <div className='flex gap-30'>
                <div className='flex flex-column gap-30'>
                    <div className="dashboard-content-block">
                        <div className="dashboard-content-block__title">Инфо</div>
                        <FieldList type={'column'} elements={taskItems(data)}/>
                    </div>
                    <div className="dashboard-content-block">
                        <div className="dashboard-content-block__title">Изменить</div>
                        <TaskSelectStatuses
                            onSelect={onSelectHandle}
                        />
                    </div>
                </div>
                <div className="dashboard-content-block flex-grow-1">
                    <div className="dashboard-content-block__title">{data.name}</div>
                    <div>{data.description}</div>
                    <div dangerouslySetInnerHTML={{__html: data.body}}></div>
                </div>
            </div>
            <div className='flex'>
                <div className="dashboard-content-block flex-grow-1">
                    <button type={'button'} className={'button button--default'}>Сохранить</button>
                </div>
            </div>
        </div>
    );
};
