import React, {useState} from 'react';
import './index.scss';
import {useParams} from 'react-router-dom';
import {Task, useGetTaskQuery, useUpdateTaskMutation} from '../../../api/tasks';
import FieldList from '../../../components/FieldList';
import {IFieldItem} from '../../../components/FieldList/FieldItem';
import {TaskSelectStatuses} from '../../../components/TaskSelectStatuses/TaskSelectStatuses';
import Page from '../../../components/Page';
import {Skeleton} from "antd";


const taskItems = (task: Task): IFieldItem[] => {

    return [
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
};

interface TaskPageProps {
    title: string;
}

export const TaskPage: React.FC<React.PropsWithChildren<TaskPageProps>> = ({ title, children }) => {

    const [isChanged, setChanged] = useState(false);
    const [updateData, setUpdateData] = useState<Partial<Task>>({});

    const { id } = useParams();
    if (!id) return null;

    const [UpdateTask] = useUpdateTaskMutation();

    const {data, isSuccess, isLoading} = useGetTaskQuery(id);
    if (isLoading) return <div>loading...</div>;
    if (!isSuccess) return null;

    const onSelectHandle = (opt: {value?: string | undefined, label?: string | undefined}) => {
        setChanged(true);
        setUpdateData((prevState) => {
            return {
                ...prevState,
                status: opt.value
            };
        });
    };

    const save = async () => {
        try {
            await UpdateTask({
                id,
                status: updateData.status
            });

            setChanged(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Page title={title}>
            <div className='flex flex-column gap-30'>
                <div className='flex gap-30'>
                    <div className='flex flex-column gap-30'>
                        <Skeleton loading={isLoading}>
                            <div className="dashboard-content-block">
                                <div className="dashboard-content-block__title">Инфо</div>
                                <FieldList type="column" elements={taskItems(data)}/>
                            </div>
                            <div className="dashboard-content-block">
                                <div className="dashboard-content-block__title">Изменить</div>
                                <TaskSelectStatuses
                                    current={data.status}
                                    onSelect={onSelectHandle}
                                />
                            </div>
                        </Skeleton>
                    </div>
                    <div className="dashboard-content-block flex-grow-1">
                        <Skeleton loading={isLoading}>
                            <div className="dashboard-content-block__title">{data.name}</div>
                            <div>{data.description}</div>
                            <div dangerouslySetInnerHTML={{__html: data.body}} />
                        </Skeleton>
                    </div>
                </div>
                {isChanged && (
                    <div className='flex'>
                        <div className="dashboard-content-block flex-grow-1">
                            <button type="button" onClick={save} className="button button--default">Сохранить</button>
                        </div>
                    </div>
                )}
            </div>
        </Page>
    );
};
