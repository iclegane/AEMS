import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Select, Spin } from 'antd';
import { ProfilePersonalSchema } from '../../../../utils/validationSchemes';
import { useUpdateProfileMutation } from '../../../../api/profile';
import { IContactForm } from './types';
import { useGetUndergroundsQuery } from '../../../../api/underground';
import ResponseMessage from '../../../ResponseMessage';


export const ContactForm: React.FC<{data: IContactForm}> = (props) => {

    const { data } = props;
    const { address, phone, underground } = data;

    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    const [UpdateProfile, { isLoading: isUpdatingTask }] =  useUpdateProfileMutation();
    const { data: undergrounds = [], isLoading: isUndergroundsLoading, isError: isUndergroundsError } = useGetUndergroundsQuery({});

    if (isUndergroundsError) {
        return <div>Попробуйте позже</div>;
    }

    const formik = useFormik({
        initialValues: {
            address,
            phone,
            underground: undergrounds.find((item) => item.name === underground)?.id || null,
        },
        initialStatus: false,
        validationSchema: ProfilePersonalSchema,
        onSubmit: async (formData) => {
            const response = UpdateProfile({
                contacts: formData
            });

            setIsSuccess(!('error' in response));
        },
    });

    return(
        <Spin spinning={isUpdatingTask}>
            {isSuccess !== null && <ResponseMessage isSuccess={isSuccess}/>}
            {isSuccess === null && (
                <form className='form' onSubmit={formik.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="name">Адрес</label>
                        <input
                            id='address'
                            name='address'
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.address || ''}
                        />
                        {formik.errors.address ? <span className="form__err-msg">{formik.errors.address}</span> : null}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name">Телефон</label>
                        <input
                            id='phone'
                            name='phone'
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.phone || ''}
                        />
                        {formik.errors.phone ? <span className="form__err-msg">{formik.errors.phone}</span> : null}
                    </div>
                    <Spin spinning={isUndergroundsLoading}>
                        <label htmlFor="name">Метро</label>
                        <Select
                            style={{ width: 120 }}
                            value={formik.values.underground}
                            onChange={(selectedOption) => {
                                formik.setFieldValue('underground', selectedOption);
                            }}
                            options={undergrounds.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                        />
                        {formik.errors.underground ? <span className="form__err-msg">{formik.errors.underground}</span> : null}
                    </Spin>
                    <button disabled={isUndergroundsLoading} type='submit' className='button button--blue form__submit'>Изменить</button>
                </form>
            )}
        </Spin>
    );
};
