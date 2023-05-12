import React, { useCallback, useMemo, useState } from 'react';
import Page from '../../../components/Page';
import UsersTable from '../../../components/Tables/UsersTable';
import { CustomModal } from '../../../components/CustomModal/CustomModal';
import AddUserForm from '../../../components/Forms/Users/AddUserForm';
import AddTaskForm from '../../../components/Forms/Users/AddTaskForm';
import { formActions } from './types';
import './index.scss';
import { PageProps } from '../../../models/IPage';


export const UsersPage: React.FC<PageProps> = ({ title }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

    const handleButtonClick = useCallback((form: formActions, taskId: string | null = null): void => {
        if (form === 'add-user') {
            setModalContent(<AddUserForm />);
        } else if (form === 'add-task') {
            if (taskId)
                setModalContent(<AddTaskForm taskID={taskId} />);
        }
        setIsOpen(true);
    }, [setIsOpen, setModalContent]);

    const handleAddTaskClick = (action: formActions, taskId: string): (() => void) => () => handleButtonClick('add-task', taskId);

    const memoizedModalContent = useMemo(() => modalContent, [modalContent]);

    const memoizedHandleAddTaskClick = useCallback(handleAddTaskClick, []);

    return (
        <Page title={title}>
            <div className="users flex flex-column gap-30">
                <div className="dashboard-content-block">
                    <button type="button" onClick={() => handleButtonClick('add-user')} className="button button--default">Добавить пользователя</button>
                </div>
                <div className="dashboard-content-block">
                    <UsersTable actionHandler={memoizedHandleAddTaskClick} />
                </div>
            </div>
            <CustomModal modalState={{ isOpen, setIsOpen }}>
                {memoizedModalContent}
            </CustomModal>
        </Page>
    );
};
