import React from 'react';
import { Spin } from 'antd';
import { useAddUserMutation } from '../../../../api/users';
import MyEditor from '../../../MyEditor';


export const AddTaskForm: React.FC<{taskID: string}> = ({ taskID }) => {

    const [addUser, { isLoading: isAddingUser }] = useAddUserMutation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <Spin spinning={isAddingUser}>
            <form className='form' onSubmit={handleSubmit}>
                <h2 className="text-center">Add new Task</h2>
                <div className='form-group'>
                    <MyEditor/>
                </div>

                <button type="submit" disabled={isAddingUser} className='button button--blue button--full-width button--center form__submit'>Добавить</button>
            </form>
        </Spin>
    );
};
