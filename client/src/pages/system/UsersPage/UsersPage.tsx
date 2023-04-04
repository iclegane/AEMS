import React, {useState} from 'react';
import './index.scss';
import Page from '../../../components/Page';
import UsersTable from '../../../components/Tables/UsersTable';
import {CustomModal} from '../../../components/CustomModal/CustomModal';
import {AddUserForm} from '../../../components/Forms/Users/AddUserForm/AddUserForm';


export const UsersPage: React.FC<{ title: string }> = ({ title}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Page title={title}>
            <div className="users flex flex-column gap-30">
                <div className="dashboard-content-block">
                    <button onClick={handleClick} className="button button--default">Добавить пользователя</button>
                </div>
                <div className="dashboard-content-block">
                    <UsersTable/>
                </div>
            </div>
            <CustomModal modalState={{ isOpen, setIsOpen }}>
                <AddUserForm/>
            </CustomModal>
        </Page>
    );
};
