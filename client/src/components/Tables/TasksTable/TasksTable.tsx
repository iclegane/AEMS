import React, { useMemo } from 'react';
import { Table, TablePaginationConfig } from 'antd';
import { SorterResult, FilterValue } from 'antd/lib/table/interface';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { useGetTasksQuery } from '../../../api/tasks';
import { ISort } from '../../../models/ISort';
import { Task } from '../../../models/ITask';


const columns: ColumnsType<Task> = [
    {
        title: 'Название задачи',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record) => (
            <Link to={`${record.id}`}>
                <span>{text.slice(0, 15)}</span>
            </Link>
        )
    },
    {
        title: 'Дата начала',
        dataIndex: 'created',
        key: 'created',
        sorter: (a, b) => a.created.length - b.created.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Крайний срок',
        dataIndex: 'deadline',
        key: 'deadline',
        sorter: (a, b) => a.deadline.length - b.deadline.length,
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        filters: [
            { text: 'Инициализация', value: 'Инициализация' },
            { text: 'В работе', value: 'В работе' },
            { text: 'Завершена', value: 'Завершена' },
        ],
    },
    {
        title: 'Постановщик',
        dataIndex: 'manager',
        key: 'manager',
    },
];

export const TasksTable: React.FC = () => {

    const [page, setPage] = React.useState<number>(1);
    const [limit, setLimit] = React.useState<number>(10);
    const [filter, setFilter] = React.useState<Record<string, FilterValue | null>>({});
    const [sort, setSort] = React.useState<ISort | null>(null);

    const { data, isLoading, isError } = useGetTasksQuery({
        page,
        limit,
        filter,
        sort,
    });

    if (isError) {
        return <p>Error loading users.</p>;
    }

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<Task> | SorterResult<Task>[],
    ) => {
        setPage(pagination.current ?? 1);
        setFilter(filters);
        setLimit(pagination.pageSize ?? 5);

        if (!Array.isArray(sorter)) {
            const { field, order } = sorter || {};
            if (field && order) {
                setSort({
                    field: field.toString(),
                    type: order === 'descend' ? -1 : 1,
                });
            }
        }
    };

    const tasksWithKeys = useMemo(() => data?.tasks.map((task) => ({ ...task, key: task.id })), [data]);

    return <Table
        onChange={handleTableChange}
        pagination={{ current: page, pageSize: limit, total: data?.count }}
        columns={columns}
        dataSource={tasksWithKeys}
        loading={isLoading}/>;
};
