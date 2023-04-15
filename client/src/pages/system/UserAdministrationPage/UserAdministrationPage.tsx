import React, { useState } from 'react';
import './index.scss';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { PageProps } from '../../../models/IPage';
import Page from '../../../components/Page';
import { useGetUserByIDQuery } from '../../../api/users';
import FieldList from '../../../components/FieldList';
import { CustomModal } from '../../../components/CustomModal/CustomModal';
import { UpdateUserForm } from '../../../components/Forms/Users/UpdateUserForm/UpdateUserForm';
import { fieldNameMap } from '../../../utils/fieldNameMap';
import { UserInfoDto } from '../../../models/IUser';


export const UserAdministrationPage: React.FC<PageProps> = () => {
    const { id } = useParams();
    if (!id) return null;

    const [isOpen, setIsOpen] = useState(false);

    const { data: user, isLoading: isGetUserLoading, isError: isGetUserError } = useGetUserByIDQuery({ id });

    if (!user || isGetUserError) {
        return null;
    }

    const fields = Object.entries(user).map(([objectKey, objectValue]) => {
        const name = fieldNameMap[objectKey as keyof UserInfoDto] || objectKey;
        let value: string | string[] = '';

        if (Array.isArray(objectValue)) {
            value = objectValue.map((v: { name: string }) => v.name);
        } else if (typeof objectValue === 'object' && objectValue !== null) {
            value = objectValue.name;
        } else if (typeof objectValue === 'string') {
            value = objectValue;
        }

        return {
            name,
            value,
        };
    });

    return (
        <Page title={`Данные пользователя ${user?.name || user.email}`}>
            <Spin spinning={isGetUserLoading}>
                <div className="flex flex-column gap-30">
                    <div className="dashboard-content-block">
                        <button
                            type="button"
                            onClick={() => setIsOpen((prevState) => !prevState)}
                            className="button button--default"
                        >Изменить данные</button>
                    </div>
                    <div className="dashboard-content-block">
                         <FieldList view="alternating" elements={fields}/>
                    </div>
                </div>
                <CustomModal modalState={{ isOpen, setIsOpen }}>
                  <UpdateUserForm data={user} />
                </CustomModal>
            </Spin>
        </Page>
    );
};
