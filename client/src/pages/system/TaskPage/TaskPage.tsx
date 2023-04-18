import React, { useEffect, useState } from 'react';
import './index.scss';
import { useParams } from 'react-router-dom';
import { Select, Skeleton } from 'antd';
import { useGetTaskQuery, useUpdateTaskMutation } from '../../../api/tasks';
import FieldList from '../../../components/FieldList';
import { IFieldItem } from '../../../components/FieldList/FieldItem';
import Page from '../../../components/Page';
import { Task } from '../../../models/ITask';
import { PageProps } from '../../../models/IPage';
import { useGetStatusesQuery } from '../../../api/statuses';


const taskItems = (task: Task): IFieldItem[] => [
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

export const TaskPage: React.FC<React.PropsWithChildren<PageProps>> = ({ title }) => {
    const { id } = useParams();
    if (!id) return null;
    const [UpdateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
    const { data: statuses, isSuccess: isStatusSuccess } = useGetStatusesQuery({});
    const { data: task, isLoading: isTaskLoading, isSuccess: isTaskSuccess } = useGetTaskQuery(id);
    const [taskStatus, setTaskStatus] = useState<string>('');

    const onStatusChangeHandler = async (value: string) => {
        try {
            await UpdateTask({
                id,
                status: value
            }).unwrap();

            setTaskStatus(value);
        } catch (e) {
            console.log('err');
        }
    };

    useEffect(() => {
        if (statuses && task) {
            const defaultStatus = statuses.find((status) => status.name === task.status);
            setTaskStatus(defaultStatus ? defaultStatus.id : '');
        }
    }, [statuses, task]);

    return (
        <Page title={title}>
            <div className='flex flex-column gap-30'>
                <div className='flex gap-30'>
                    <div className='flex flex-column gap-30'>
                        <Skeleton loading={isTaskLoading}>
                            {isTaskSuccess && (
                                <>
                                    <div className="dashboard-content-block">
                                        <div className="dashboard-content-block__title">Инфо</div>
                                        <FieldList type="column" elements={taskItems(task)} />
                                    </div>
                                    <div className="dashboard-content-block">
                                        <div className="dashboard-content-block__title">Изменить</div>
                                        {isStatusSuccess && (
                                            <Select
                                                loading={isUpdating}
                                                style={{ width: '100%' }}
                                                onChange={onStatusChangeHandler}
                                                value={taskStatus}
                                                options={statuses.map((status) => ({
                                                    value: status.id,
                                                    label: status.name
                                                }))}
                                            />
                                        )}
                                    </div>
                                </>
                            )}
                        </Skeleton>
                    </div>
                    <div className="dashboard-content-block flex-grow-1">
                        <Skeleton loading={isTaskLoading}>
                            {isTaskSuccess && (
                                <>
                                    <div className="dashboard-content-block__title">{task.name}</div>
                                    <div>{task.description}</div>
                                    <div dangerouslySetInnerHTML={{ __html: task.body }} />
                                </>
                            )}
                        </Skeleton>
                    </div>
                </div>
            </div>
        </Page>
    );
};
