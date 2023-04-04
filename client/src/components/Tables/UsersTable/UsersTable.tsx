import React from "react";
import {Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {IUser} from "../../../models/IUser";
import {useGetUsersQuery} from "../../../api/users";


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
        width: '20%',
        sorter: (a, b) => a.email.length - b.email.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Post',
        dataIndex: 'post',
        key: 'post',
        width: '20%'
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        width: '20%',
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
];

export const UsersTable: React.FC = () => {

    const { data: users = [], isLoading, isError } = useGetUsersQuery();

    if (isError) {
        return <p>Error loading users.</p>;
    }

    const usersWithKeys = users.map((user) => ({ ...user, key: user.id }));

    return (
        <>
            <Table columns={columns} dataSource={usersWithKeys} loading={isLoading}/>
        </>
    )
}