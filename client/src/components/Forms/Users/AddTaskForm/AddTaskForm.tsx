import React, { useState } from 'react';
import { DatePicker, Spin, Form, Input } from 'antd';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import MyEditor from '../../../MyEditor';
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
    const [formError, setFormError] = useState({
        isError: false,
        message: ''
    });
 
    const formik = useFormik({
        initialValues: {
            ...initialValues,
            performerID: taskID,
            managerID: user?.id ?? '',
        },
        initialStatus: false,
        validationSchema: AddTaskFormSchema,
        onSubmit: async (formData) => {
            try {
                await createTask(formData).unwrap();

                setFormError((prevState) => ({ ...prevState, isError: false }));
            } catch(e) {
                setFormError({
                    isError: true,
                    message: e.data.message ?? 'ServerError'
                });
            }
        }
    });
 
    return (
        <Spin spinning={isCreatingTask}>
            <Form layout="vertical" onSubmitCapture={formik.handleSubmit}>
                <h2 className="text-center">Добавить новую задачу</h2>
                <Form.Item label="Название задачи">
                    <Input name='name' placeholder="Название задачи" value={formik.values.name} onChange={formik.handleChange} />
                    {formik.errors.name ? <span className="form__err-msg">{formik.errors.name}</span> : null}
                </Form.Item>
                <Form.Item label="Введите краткое описание">
                    <Input name='description' placeholder="Название задачи" value={formik.values.description} onChange={formik.handleChange} />
                    {formik.errors.description ? <span className="form__err-msg">{formik.errors.description}</span> : null}
                </Form.Item>
                <Form.Item label="Введите краткое описание">
                    <DatePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        onChange={(_, dateString) => formik.setFieldValue('deadline', dateString)}
                    />
                    {formik.errors.deadline ? <span className="form__err-msg">{formik.errors.deadline}</span> : null}
                </Form.Item>
                <Form.Item label="Введите краткое описание">
                    <MyEditor onHtmlChange={(html) => formik.setFieldValue('body', html)}/>
                    {formik.errors.body ? <span className="form__err-msg">{formik.errors.body}</span> : null}
                </Form.Item>
                <Form.Item label="Исполнитель">
                    <Input name='performerID' placeholder="Исполнитель" value={formik.values.performerID} type='text' readOnly />
                </Form.Item>

                {formError.isError && (
                    <span className="form__err-msg">{formError.message}</span>
                )}

                <button type='submit'  className='button button--blue form__submit'>Создать</button>
            </Form>
        </Spin>
    );
};
