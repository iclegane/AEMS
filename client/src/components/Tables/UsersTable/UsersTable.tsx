import React from 'react';
import {Table, Space} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {IUser} from '../../../models/IUser';
import {useGetUsersQuery} from '../../../api/users';
import {formActions} from '../../../pages/system/UsersPage';


export const UsersTable: React.FC<{actionHandler: (action: formActions, id: string) => () => void}> = ({actionHandler}) => {

    const { data: users = [], isLoading, isError } = useGetUsersQuery();

    if (isError) {
        return <p>Error loading users.</p>;
    }

    const handleAddTaskButtonClick = (id: string): React.MouseEventHandler<HTMLButtonElement> => (event) => {
        event.preventDefault();

        const handleAction = actionHandler('add-task', id);
        handleAction();
    };

    const columns: ColumnsType<IUser> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '15%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '10%',
            sorter: (a, b) => a.email.length - b.email.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Post',
            dataIndex: 'post',
            key: 'post',
            width: '10%'
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: '10%',
            filters: [
                {
                    text: 'User',
                    value: 'User',
                },
                {
                    text: 'Manager',
                    value: 'Manager',
                },
                {
                    text: 'Admin',
                    value: 'Admin',
                },
            ],
            onFilter: (value: string | number | boolean, record) => record.role.startsWith(value.toString()),
            filterSearch: true,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: '20%',
            render: (_, record) => (
                <Space size="middle">
                    <button onClick={handleAddTaskButtonClick(record.id)} type="button" className="button button--default">Добавить задачу</button>
                </Space>
            ),
        },
    ];

    const usersWithKeys = users.map((user) => ({ ...user, key: user.id }));

    return (
        <Table columns={columns} dataSource={usersWithKeys} loading={isLoading}/>
    );
};
