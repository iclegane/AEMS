import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Select, Spin, Form, Input } from 'antd';
import { AddUserFormSchema } from '../../../../utils/validationSchemes';
import { useAddUserMutation } from '../../../../api/users';
import { IAddUserFromFields } from './types';
import { useGetPostsQuery } from '../../../../api/post';
import { useGetSkillsQuery } from '../../../../api/skills';
import { useGetRolesQuery } from '../../../../api/role';


export const AddUserForm: React.FC = () => {
    const { data: roles = [] } = useGetRolesQuery({});
    const { data: posts = [] } = useGetPostsQuery({});
    const { data: skills = [] } = useGetSkillsQuery({});
    const [addUser, { isLoading: isAddingUser }] = useAddUserMutation();
    const [formError, setFormError] = useState({
        isError: false,
        message: ''
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
            confirmPassword: '',
            role: '',
            email: '',
            post: '',
            skill: [],
        },
        initialStatus: false,
        validationSchema: AddUserFormSchema,
        onSubmit: async (formData: IAddUserFromFields) => {
            try {
                const { confirmPassword, ...userData } = formData;
                await addUser(userData).unwrap();

                setFormError((prevState) => ({ ...prevState, isError: false }));
            } catch (e) {
                setFormError({
                    isError: true,
                    message: e.data.message ?? 'ServerError'
                });
            }
        },
    });

    return (
        <Spin spinning={isAddingUser}>
            <Form layout="vertical" onSubmitCapture={formik.handleSubmit}>
                <h2 className="text-center">Добавить нового пользователя</h2>
                <Form.Item label="Имя">
                    <Input name='name' placeholder="John Doe Development" value={formik.values.name} onChange={formik.handleChange} />
                    {formik.errors.name ? <span className="form__err-msg">{formik.errors.name}</span> : null}
                </Form.Item>
                <Form.Item label="Почта">
                    <Input name='email' placeholder="host@reg.ru" value={formik.values.email} onChange={formik.handleChange} />
                    {formik.errors.email ? <span className="form__err-msg">{formik.errors.email}</span> : null}
                </Form.Item>
                <Form.Item label="Роль">
                    <Select
                        style={{ width: '100%' }}
                        value={formik.values.role}
                        onChange={(selectedOption) => formik.setFieldValue('role', selectedOption)}
                        options={roles.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                    />
                    {formik.errors.role ? <span className="form__err-msg">{formik.errors.role}</span> : null}
                </Form.Item>
                <Form.Item label="Должность">
                    <Select
                        style={{ width: '100%' }}
                        value={formik.values.post}
                        onChange={(selectedOption) => formik.setFieldValue('post', selectedOption)}
                        options={posts.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                    />
                    {formik.errors.post ? <span className="form__err-msg">{formik.errors.post}</span> : null}
                </Form.Item>
                <Form.Item label="Навыки">
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        value={formik.values.skill}
                        onChange={(selectedOption) => formik.setFieldValue('skill', selectedOption)}
                        options={skills.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                    />
                    {formik.errors.skill ? <span className="form__err-msg">{formik.errors.skill}</span> : null}
                </Form.Item>
                <Form.Item label="Пароль">
                    <Input name='password' type='password' placeholder="*****" value={formik.values.password} onChange={formik.handleChange} />
                    {formik.errors.password ? <span className="form__err-msg">{formik.errors.password}</span> : null}
                </Form.Item>
                <Form.Item label="Повторите пароль">
                    <Input name='confirmPassword' type='password' placeholder="*****" value={formik.values.confirmPassword} onChange={formik.handleChange} />
                    {formik.errors.confirmPassword ? <span className="form__err-msg">{formik.errors.confirmPassword}</span> : null}
                </Form.Item>

                {formError.isError && (
                    <span className="form__err-msg">{formError.message}</span>
                )}

                <button type='submit' disabled={!formik.dirty || formik.isSubmitting} className='button button--blue form__submit'>Создать</button>
            </Form>
        </Spin>
    );
};
