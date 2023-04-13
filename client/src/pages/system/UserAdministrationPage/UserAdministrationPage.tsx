import React, { useState } from 'react';
import Page from '../../../components/Page';
import './index.scss';
import { PageProps } from '../../../models/IPage';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetUserByIDQuery } from '../../../api/users';
import FieldList from '../../../components/FieldList';
import { CustomModal } from '../../../components/CustomModal/CustomModal';
import { UpdateUserForm } from '../../../components/Forms/Users/UpdateUserForm/UpdateUserForm';


export const UserAdministrationPage: React.FC<PageProps> = ({ title }) => {
    const { id } = useParams();
    if (!id) return null;

    const [isOpen, setIsOpen] = useState(false);

    const { data: user, isLoading: isGetUserLoading, isError: isGetUserError } = useGetUserByIDQuery({ id });

    if (!user || isGetUserError) {
        return null;
    }

    const fields = Object.entries(user).map(([key, value]) => {
        let fieldValue: string | string[] = value;

        if (Array.isArray(value)) {
            fieldValue = value.map(({ v }) => v || '');
        } else if (typeof value === 'object' && value !== null) {
            ({ name: fieldValue } = value);
        }

        return { name: key, value: fieldValue };
    });

    return (
        <Page title={`Данные пользователя ${user?.name || user.email}`}>
            <Spin spinning={isGetUserLoading}>
                <div className="flex flex-column gap-30">
                    <div className="dashboard-content-block">
                        <FieldList view="alternating" elements={fields}/>
                    </div>
                    <div className="dashboard-content-block">
                        <button
                            type="button"
                            onClick={() => setIsOpen((prevState) => !prevState)}
                            className="button button--default"
                        >Изменить данные</button>
                    </div>
                </div>
                <CustomModal modalState={{ isOpen, setIsOpen }}>
                  <UpdateUserForm />
                </CustomModal>
            </Spin>
        </Page>
    );
};
