import React, { useState } from 'react';
import { useFormik } from 'formik';
import { DatePicker, Select, Spin, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { ProfilePersonalSchema } from '../../../../utils/validationSchemes';
import { IPersonalForm } from './types';
import { useUpdateProfileMutation } from '../../../../api/profile';
import { useGetGendersQuery } from '../../../../api/gender';


export const PersonalForm: React.FC<{ data: IPersonalForm }> = ({ data }) => {
    const { name, birth_date, gender } = data;
    const [formError, setFormError] = useState({
        isError: false,
        message: ''
    });
    const { data: genders = [] } = useGetGendersQuery({});
    const [UpdateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();

    const formik = useFormik({
        initialValues: {
            name: name ?? '',
            birth_date: birth_date ?? '',
            gender: genders.find(el => el.name === gender)?.id ?? '',
        },
        initialStatus: false,
        validationSchema: ProfilePersonalSchema,
        onSubmit: async (formData) => {
            try {
                await UpdateProfile({
                    personal: formData
                }).unwrap();

                setFormError((prevState) => ({ ...prevState, isError: false }));
            } catch (error) {
                setFormError({
                    isError: true,
                    message: error.data.message ?? 'ServerError'
                });
            }
        }
    });

    return (
        <Spin spinning={isUpdatingProfile}>
            <Form layout="vertical" onSubmitCapture={formik.handleSubmit}>
                <Form.Item label="Имя">
                    <Input name='name' placeholder="John Doe Development" value={formik.values.name} onChange={formik.handleChange} />
                    {formik.errors.name ? <span className="form__err-msg">{formik.errors.name}</span> : null}
                </Form.Item>
                <Form.Item label="Дата рождения">
                    <DatePicker
                        format="DD.MM.YYYY"
                        placeholder="Выбрать дату"
                        defaultValue={dayjs(formik.values.birth_date, 'DD.MM.YYYY')}
                        onChange={(_, dateString) => formik.setFieldValue('birth_date', dateString)}
                    />
                    {formik.errors.birth_date ? <span className="form__err-msg">{formik.errors.birth_date}</span> : null}
                </Form.Item>
                <Form.Item label="Пол">
                    <Select
                        style={{ width: '100%' }}
                        value={formik.values.gender}
                        onChange={(selectedOption) => formik.setFieldValue('gender', selectedOption)}
                        options={genders.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                    />
                    {formik.errors.gender ? <span className="form__err-msg">{formik.errors.gender}</span> : null}
                </Form.Item>

                {formError.isError && (
                    <span className="form__err-msg">{formError.message}</span>
                )}

                <button type='submit' disabled={!formik.dirty || formik.isSubmitting} className='button button--blue form__submit'>Изменить</button>
            </Form>
        </Spin>
    );
};
