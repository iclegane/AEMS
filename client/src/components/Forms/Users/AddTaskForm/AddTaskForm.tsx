import React, { useState } from 'react';
import { Spin, DatePicker } from 'antd';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import MyEditor from '../../../MyEditor';
import ResponseMessage from '../../../ResponseMessage';
import { AddTaskFormSchema } from '../../../../utils/validationSchemes';
import { useCreateTaskMutation } from '../../../../api/tasks';
import { RootState } from '../../../../store/store';


const initialValues = {
        name: '',
        description: '',
        deadline: '',
        body: '',
};

export const AddTaskForm: React.FC<{taskID: string}> = ({ taskID }) => {

    const { user } = useSelector((state: RootState) => state.authReducer.auth);
    const [createTask, { isLoading: isCreatingTask }] = useCreateTaskMutation();
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    const formik = useFormik({
        initialValues: {
            ...initialValues,
            performerID: taskID,
            managerID: user?.id ?? '',
        },
        initialStatus: false,
        validationSchema: AddTaskFormSchema,
        onSubmit: async (formData, actions) => {
            const response = await createTask(formData);
            setIsSuccess(!('error' in response));
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formik.handleSubmit(e);
    };

    const onHtmlHandler = (html: string) => {
        formik.setFieldValue('body', html);
    };
    
    const onDateHandler = (date: any, dateString: string) => {
        formik.setFieldValue('deadline', dateString);
    };

    return (
        <Spin spinning={isCreatingTask}>
            {isSuccess !== null && <ResponseMessage isSuccess={isSuccess}/>}
            {isSuccess === null && (
                <form className='form' onSubmit={handleSubmit}>
                    <h2 className="text-center">Добавить новую задачу</h2>
                    <div className='form-group'>
                        <label htmlFor="name">Введите название задачи</label>
                        <input
                            placeholder='Название задачи'
                            type="text"
                            name='name'
                            id='name'
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        {formik.errors.name ? <span className="form__err-msg">{formik.errors.name}</span> : null}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="description">Введите краткое описание</label>
                        <input
                            placeholder='Краткое описание'
                            type="text"
                            name='description'
                            id='description'
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        />
                        {formik.errors.description ? <span className="form__err-msg">{formik.errors.description}</span> : null}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name">Введите крайний срок</label>
                        <DatePicker
                            showTime={{ format: 'HH:mm' }}
                            format="YYYY-MM-DD HH:mm"
                            onChange={onDateHandler}
                        />
                        {formik.errors.deadline ? <span className="form__err-msg">{formik.errors.deadline}</span> : null}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="MyEditor">Введите описание задачи</label>
                        <MyEditor onHtmlChange={onHtmlHandler}/>
                        {formik.errors.body ? <span className="form__err-msg">{formik.errors.body}</span> : null}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="performerID">Исполнитель</label>
                        <input onChange={formik.handleChange} value={taskID} type="text" name='performerID' id='performerID' readOnly/>
                        {formik.errors.performerID ? <span className="form__err-msg">{formik.errors.performerID}</span> : null}
                    </div>

                    <button type="submit" disabled={isCreatingTask} className='button button--blue button--full-width button--center form__submit'>Добавить</button>
                </form>
            )}
        </Spin>
    );
};
