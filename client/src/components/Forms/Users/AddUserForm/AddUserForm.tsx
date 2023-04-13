import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Result, Select, Spin } from 'antd';
import { SignUpSchema } from '../../../../utils/validationSchemes';
import { useAddUserMutation } from '../../../../api/users';
import { AddUserFormSelectOption, AddUserResponse, IAddUserFromFields } from './types';
import { useGetPostsQuery } from '../../../../api/post';
import { useGetSkillsQuery } from '../../../../api/skills';


const roles: AddUserFormSelectOption[] = [
    {
        key: 'User',
        value: 'User',
        label: 'User',
    },
    {
        key: 'Manager',
        value: 'Manager',
        label: 'Manager',
    },
];

export const AddUserForm: React.FC = () => {
    const { data: posts = [] } = useGetPostsQuery({});
    const { data: skills = [] } = useGetSkillsQuery({});
    const [addUser, { isLoading: isAddingUser }] = useAddUserMutation();
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const [initialValues] = useState({
        name: '',
        password: '',
        confirmPassword: '',
        role: '',
        email: '',
        post: '',
        skills: [],
    });

    const formik = useFormik({
        initialValues,
        initialStatus: false,
        validationSchema: SignUpSchema,
        onSubmit: async (formData: IAddUserFromFields, actions) => {
            const { confirmPassword, ...userData } = formData;
            const response: AddUserResponse = await addUser(userData);

            setIsSuccess(!!response.data);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formik.handleSubmit(e);
    };

    const Message = () => (
        <Result
            status={isSuccess ? 'success' : 'error'}
            title={isSuccess ? 'Successfully Added User' : 'Submission Failed'}
            subTitle={isSuccess ? 'New user has been added successfully.' : 'Please check and modify the form before resubmitting.'}
        />
    );

    const Form = () => (
            <form className='form' onSubmit={handleSubmit}>
                <h2 className="text-center">Добавить нового пользователя</h2>
                <div className='form-group'>
                    <label htmlFor="name">Имя</label>
                    <input
                        id='name'
                        name='name'
                        type="text"
                        placeholder='Ivanov Ivan Ivanovich'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name ? <span className="form__err-msg">{formik.errors.name}</span> : null}
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Почта</label>
                    <input
                        id='email'
                        name='email'
                        type="email"
                        placeholder='host@reg.ru'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email ? <span className="form__err-msg">{formik.errors.email}</span> : null}
                </div>
                <div className='form-group'>
                    <label htmlFor="role">Роль</label>
                    <Select
                        style={{ width: '100%' }}
                        onChange={(selectedOption) => {
                            formik.setFieldValue('role', selectedOption);
                        }}
                        options={roles}
                        className={formik.errors.role && formik.touched.role ? 'form__select form__select--error' : 'form__select'}
                    />
                    {formik.errors.role && formik.touched.role ? <div className="form__err-msg">{formik.errors.role}</div> : null}
                </div>
                <div className='form-group'>
                    <label htmlFor="role">Должность</label>
                    <Select
                        style={{ width: '100%' }}
                        onChange={(selectedOption) => {
                            formik.setFieldValue('post', selectedOption);
                        }}
                        options={posts.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                        className={formik.errors.post && formik.touched.post ? 'form__select form__select--error' : 'form__select'}
                    />
                    {formik.errors.post && formik.touched.post ? <div className="form__err-msg">{formik.errors.post}</div> : null}
                </div>
                <div className='form-group'>
                    <label htmlFor="role">Навыки</label>
                    <Select
                        style={{ width: '100%' }}
                        mode="multiple"
                        onChange={(selectedOption) => {
                            formik.setFieldValue('skills', selectedOption);
                        }}
                        options={skills.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                        className={formik.errors.skills && formik.touched.skills ? 'form__select form__select--error' : 'form__select'}
                    />
                    {formik.errors.skills && formik.touched.skills ? <div className="form__err-msg">{formik.errors.skills}</div> : null}
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Пароль</label>
                    <input
                        id='password'
                        name='password'
                        type="password"
                        placeholder='****'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password ? <span className="form__err-msg">{formik.errors.password}</span> : null}
                </div>
                <div className='form-group'>
                    <label htmlFor="confirmPassword">Повторите пароль</label>
                    <input
                        id='confirmPassword'
                        name='confirmPassword'
                        type="password"
                        placeholder='****'
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                    />
                    {formik.errors.confirmPassword ? <span className="form__err-msg">{formik.errors.confirmPassword}</span> : null}
                </div>
                <button type="submit" disabled={isAddingUser} className='button button--blue button--full-width button--center form__submit'>Добавить</button>
            </form>
        );

    return(
        <Spin spinning={isAddingUser}>
            {isSuccess === null && Form()}
            {isSuccess !== null && Message()}
        </Spin>
    );
};
