import React, { useState } from 'react';
import { useFormik } from 'formik';
import type { DatePickerProps } from 'antd';
import { DatePicker, Select, Spin } from 'antd';
import dayjs from 'dayjs';
import { ProfilePersonalSchema } from '../../../../utils/validationSchemes';
import { IPersonalForm } from './types';
import { useUpdateProfileMutation } from '../../../../api/profile';
import ResponseMessage from '../../../ResponseMessage';


const genders = ['Мужской', 'Женский'];

export const PersonalForm: React.FC<{data: IPersonalForm}> = ({ data }) => {
    const { name, birth_date, gender } = data;
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const [UpdateProfile, { isLoading: isUpdatingProfile }] =  useUpdateProfileMutation();
    const [ initialValues ] = useState({
        name: name ?? '',
        birth_date: birth_date ?? '',
        gender: gender ?? '',
    });

    const formik = useFormik({
        initialValues,
        initialStatus: false,
        validationSchema: ProfilePersonalSchema,
        onSubmit: async (formData) => {
            const response = await UpdateProfile({
                personal: formData
            });

            setIsSuccess(!('error' in response));
        },
    });

    const onDateChangeHandler: DatePickerProps['onChange'] = (date, dateString) => {
        formik.setFieldValue('birth_date', dateString);
    };

    return(
        <Spin spinning={isUpdatingProfile}>
            {isSuccess !== null && <ResponseMessage isSuccess={isSuccess}/>}
            {isSuccess === null && (
                <form className='form' onSubmit={formik.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="name">Имя</label>
                    <input
                        id='name'
                        name='name'
                        type="text"
                        placeholder='John Doe'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name ? <span className="form__err-msg">{formik.errors.name}</span> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="birth_date">Дата рождения</label>
                    <DatePicker
                        format="DD.MM.YYYY"
                        placeholder="Выбрать дату"
                        defaultValue={dayjs(formik.values.birth_date, 'DD.MM.YYYY')}
                        onChange={onDateChangeHandler}
                    />
                    {formik.errors.birth_date ? <span className="form__err-msg">{formik.errors.birth_date}</span> : null}
                </div>
                <div className='form-group'>
                    <label htmlFor="gender">Пол</label>
                    <Select
                        style={{ width: 120 }}
                        value={formik.values.gender}
                        onChange={(selectedOption) => {
                            formik.setFieldValue('gender', selectedOption);
                        }}
                        options={genders.map((el) => ({
                            label: el,
                            value: el,
                        }))}
                    />
                    {formik.errors.gender ? <span className="form__err-msg">{formik.errors.gender}</span> : null}
                </div>
                <button type='submit' className='button button--blue form__submit'>Изменить</button>
            </form>
            )}
        </Spin>
    );
};
