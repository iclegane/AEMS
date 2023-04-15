import React from 'react';
import { useFormik } from 'formik';
import { DatePicker, Select, Form, Input  } from 'antd';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useGetPostsQuery } from '../../../../api/post';
import { useGetSkillsQuery } from '../../../../api/skills';
import { useGetUndergroundsQuery } from '../../../../api/underground';
import { useGetRolesQuery } from '../../../../api/role';
import { useGetGendersQuery } from '../../../../api/gender';
import { UserInfoDto } from '../../../../models/IUser';
import { useUpdateUserByIDMutation } from '../../../../api/users';
 

export const UpdateUserForm: React.FC<{data: UserInfoDto}> = ({ data }) => {
    const { id } = useParams();
    const [UpdateUserByID] = useUpdateUserByIDMutation();
    const { data: posts = [], isLoading: isPostsLoading } = useGetPostsQuery({});
    const { data: roles = [], isLoading: isRolesLoading } = useGetRolesQuery({});
    const { data: genders = [], isLoading: isGendersLoading } = useGetGendersQuery({});
    const { data: skills = [], isLoading: isSkillsLoading } = useGetSkillsQuery({});
    const { data: undergrounds = [], isLoading: isUndergroundsLoading } = useGetUndergroundsQuery({});

    if (!id) return null;

    const formik = useFormik({
        initialValues: {
            name: data.name || '',
            email: data.email || '',
            address: data.address || '',
            phone: data.phone || '',
            birth_date: data.birth_date || '',
            work_date: data.work_date || '',
            post: data.post?.id || 'null',
            role: data.role?.id || 'null',
            gender: data.gender?.id || '',
            skill: data.skill.map((el) => el.id) || [],
            underground: data.underground?.id || 'null',
        },
        initialStatus: false,
        validationSchema: null,
        onSubmit: async (formData) => {
            try {
                await UpdateUserByID({
                    id,
                    data: formData,
                });
            } catch (e) {
                console.log(e);
            }
        },
    });

    return(
        <Form layout="vertical" onSubmitCapture={formik.handleSubmit}>
            <h2 className="text-center">Изменить данные пользователя</h2>
            <Form.Item label="ФИО">
                <Input placeholder="ФИО" value={formik.values.name} onChange={formik.handleChange} />
                {formik.errors.name ? <span className="form__err-msg">{formik.errors.name}</span> : null}
            </Form.Item>
            <Form.Item label="Почта">
                <Input placeholder="Почта" value={formik.values.email} onChange={formik.handleChange} />
                {formik.errors.email ? <span className="form__err-msg">{formik.errors.email}</span> : null}
            </Form.Item>
            <Form.Item label="Адрес">
                <Input placeholder="Адрес" value={formik.values.address} onChange={formik.handleChange} />
            {formik.errors.address ? <span className="form__err-msg">{formik.errors.address}</span> : null}
            </Form.Item>
            <Form.Item label="Телефон">
                <Input placeholder="+79008003510" value={formik.values.phone} onChange={formik.handleChange} />
                {formik.errors.phone ? <span className="form__err-msg">{formik.errors.phone}</span> : null}
            </Form.Item>
            <Form.Item label="Дата рождения">
                <DatePicker
                    id="birth_date"
                    name="birth_date"
                    placeholder="Выберете дату"
                    format="DD.MM.YYYY"
                    defaultValue={dayjs(formik.values.birth_date, 'DD.MM.YYYY')}
                    onChange={(_, dateString: string) => formik.setFieldValue('birth_date', dateString)}
                />
                {formik.errors.birth_date ? <span className="form__err-msg">{formik.errors.birth_date}</span> : null}
            </Form.Item>
            <Form.Item label="Первый рабочий день">
                <DatePicker
                    placeholder="Выберете дату"
                    format="DD.MM.YYYY"
                    defaultValue={dayjs(formik.values.work_date, 'DD.MM.YYYY')}
                    onChange={(_, dateString: string) => formik.setFieldValue('work_date', dateString)}
                />
                {formik.errors.work_date ? <span className="form__err-msg">{formik.errors.work_date}</span> : null}
            </Form.Item>
            <Form.Item label="Должность">
                <Select
                    style={{ width: '100%' }}
                    placeholder="Выберете должность"
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
            </Form.Item>
            <Form.Item label="Роли">
                <Select
                    style={{ width: '100%' }}
                    placeholder="Выберете роль"
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
            </Form.Item>
            <Form.Item label="Пол">
                <Select
                    style={{ width: '100%' }}
                    placeholder="Выберете пол"
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
            </Form.Item>
            <Form.Item label="Навыки">
                <Select
                    style={{ width: '100%' }}
                    mode="multiple"
                    placeholder="Выберете Навыки"
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
            </Form.Item>
            <Form.Item label="Метро">
                <Select
                    style={{ width: '100%' }}
                    placeholder="Выберете метро"
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
            </Form.Item>
            <button type="submit"  disabled={!formik.dirty || formik.isSubmitting} className="button button--blue button--full-width button--center form__submit">Изменить данные</button>
        </Form>
    );
};
