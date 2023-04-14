import React from 'react';
import { useFormik } from 'formik';
import { DatePicker, Select } from 'antd';
import { useGetPostsQuery } from '../../../../api/post';
import { useGetSkillsQuery } from '../../../../api/skills';
import { useGetUndergroundsQuery } from '../../../../api/underground';
import { useGetRolesQuery } from '../../../../api/role';
import { useGetGendersQuery } from '../../../../api/gender';
 

export const UpdateUserForm: React.FC = () => {

    const { data: posts = [], isLoading: isPostsLoading } = useGetPostsQuery({});
    const { data: roles = [], isLoading: isRolesLoading } = useGetRolesQuery({});
    const { data: genders = [], isLoading: isGendersLoading } = useGetGendersQuery({});
    const { data: skills = [], isLoading: isSkillsLoading } = useGetSkillsQuery({});
    const { data: undergrounds = [], isLoading: isUndergroundsLoading } = useGetUndergroundsQuery({});
    
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            address: '',
            phone: '',
            birth_date: '',
            work_date: '',
            post: '',
            role: '',
            gender: '',
            skill: [],
            underground: '',
        },
        initialStatus: false,
        validationSchema: null,
        onSubmit: async (formData, actions) => {
            console.log(formData);
        },
    });
    
    return(
        <form className='form'onSubmit={formik.handleSubmit}>
            <h2 className="text-center">Изменить данные пользователя</h2>
            <div className='form-group'>
                <label htmlFor="name">ФИО</label>
                <input
                    placeholder=''
                    type="text"
                    name='name'
                    id='name'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.errors.name ? <span className="form__err-msg">{formik.errors.name}</span> : null}
            </div>
            <div className='form-group'>
                <label htmlFor="name">Почта</label>
                <input
                    placeholder='email'
                    type="email"
                    name='email'
                    id='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email ? <span className="form__err-msg">{formik.errors.email}</span> : null}
            </div>
            <div className='form-group'>
                <label htmlFor="name">Адрес</label>
                <input
                    placeholder='address'
                    type="text"
                    name='address'
                    id='address'
                    onChange={formik.handleChange}
                    value={formik.values.address}
                />
                {formik.errors.address ? <span className="form__err-msg">{formik.errors.address}</span> : null}
            </div>
            <div className='form-group'>
                <label htmlFor="name">Телефон</label>
                <input
                    placeholder='+79008003510'
                    type="text"
                    name='phone'
                    id='phone'
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                />
                {formik.errors.phone ? <span className="form__err-msg">{formik.errors.phone}</span> : null}
            </div>
            <div className='form-group'>
                <label htmlFor="name">Дата рождения</label>
                <DatePicker
                    format="DD.MM.YYYY"
                    onChange={(date: any, dateString: string) => formik.setFieldValue('birth_date', dateString)}
                />
                {formik.errors.birth_date ? <span className="form__err-msg">{formik.errors.birth_date}</span> : null}
            </div>
            <div className='form-group'>
                <label htmlFor="name">Первый рабочий день</label>
                <DatePicker
                    format="DD.MM.YYYY"
                    onChange={(date: any, dateString: string) => formik.setFieldValue('work_date', dateString)}
                />
                {formik.errors.work_date ? <span className="form__err-msg">{formik.errors.work_date}</span> : null}
            </div>
            <div className='form-group'>
                <label htmlFor="name">Должность</label>
                <Select
                    style={{ width: '100%' }}
                    loading={isPostsLoading}
                    value={formik.values.post}
                    onChange={(selectedOption) => {
                        formik.setFieldValue('post', selectedOption);
                    }}
                    options={posts.map((el) => ({
                        label: el.name,
                        value: el.id,
                    }))}
                />
                {formik.errors.post ? <span className="form__err-msg">{formik.errors.post}</span> : null}
            </div>
            <div className='form-group'>
                <label htmlFor="name">Роли</label>
                <Select
                    style={{ width: '100%' }}
                    value={formik.values.role}
                    loading={isRolesLoading}
                    onChange={(selectedOption) => {
                        formik.setFieldValue('role', selectedOption);
                    }}
                    options={roles.map((el) => ({
                        label: el.name,
                        value: el.id,
                    }))}
                />
                {formik.errors.role ? <span className="form__err-msg">{formik.errors.role}</span> : null}
            </div>
            <div className='form-group'>
                <label htmlFor="name">Пол</label>
                <Select
                    style={{ width: '100%' }}
                    value={formik.values.gender}
                    loading={isGendersLoading}
                    onChange={(selectedOption) => {
                        formik.setFieldValue('gender', selectedOption);
                    }}
                    options={genders.map((el) => ({
                        label: el.name,
                        value: el.id,
                    }))}
                />
                {formik.errors.gender ? <span className="form__err-msg">{formik.errors.gender}</span> : null}
            </div>
            <div className='form-group'>
                <label htmlFor="name">Навыки</label>
                <Select
                    style={{ width: '100%' }}
                    mode="multiple"
                    value={formik.values.skill}
                    loading={isSkillsLoading}
                    onChange={(selectedOption) => {
                        formik.setFieldValue('skill', selectedOption);
                    }}
                    options={skills.map((el) => ({
                        label: el.name,
                        value: el.id,
                    }))}
                />
                {formik.errors.skill ? <span className="form__err-msg">{formik.errors.skill}</span> : null}
            </div>
            <div className='form-group'>
                <label htmlFor="name">Метро</label>
                <Select
                    style={{ width: 120 }}
                    value={formik.values.underground}
                    loading={isUndergroundsLoading}
                    onChange={(selectedOption) => {
                        formik.setFieldValue('underground', selectedOption);
                    }}
                    options={undergrounds.map((el) => ({
                        label: el.name,
                        value: el.id,
                    }))}
                />
                {formik.errors.underground ? <span className="form__err-msg">{formik.errors.underground}</span> : null}
            </div>
            <button type="submit" className="button button--default">Изменить данные</button>
        </form>
    );
};
