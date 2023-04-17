import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Select, Spin, Form, Input } from 'antd';
import { ProfileContactsSchema } from '../../../../utils/validationSchemes';
import { useUpdateProfileMutation } from '../../../../api/profile';
import { IContactForm } from './types';
import { useGetUndergroundsQuery } from '../../../../api/underground';


export const ContactForm: React.FC<{data: IContactForm}> = ({ data }) => {
    const { address, phone, underground } = data;
    const [formError, setFormError] = useState({
        isError: false,
        message: ''
    });
    const [UpdateProfile, { isLoading: isUpdatingTask }] =  useUpdateProfileMutation();
    const { data: undergrounds = [], isError: isUndergroundsError } = useGetUndergroundsQuery({});

    const formik = useFormik({
        initialValues: {
            address: address ?? '',
            phone: phone ?? '',
            underground: undergrounds.find(el => el.name === underground)?.id ?? '' ?? '',
        },
        initialStatus: false,
        validationSchema: ProfileContactsSchema,
        onSubmit: async (formData) => {
            try {
                await UpdateProfile({
                    contacts: formData
                }).unwrap();

                setFormError((prevState) => ({ ...prevState, isError: false }));
            } catch(error) {
                setFormError({
                    isError: true,
                    message: error.data.message ?? 'ServerError'
                });
            }
        },
    });

    if (isUndergroundsError) {
        return <div>Попробуйте позже</div>;
    }

    return(
        <Spin spinning={isUpdatingTask}>
             <Form layout="vertical" onSubmitCapture={formik.handleSubmit}>
                <Form.Item label="Адрес">
                    <Input 
                        name='address' 
                        placeholder="John Doe Development" 
                        value={formik.values.address} onChange={formik.handleChange} 
                    />
                    {formik.errors.address ? <span className="form__err-msg">{formik.errors.address}</span> : null}
                </Form.Item>

                <Form.Item label="Телефон">
                    <Input 
                        name='phone' 
                        placeholder="John Doe Development" 
                        value={formik.values.phone} onChange={formik.handleChange} 
                    />
                    {formik.errors.phone ? <span className="form__err-msg">{formik.errors.phone}</span> : null}
                </Form.Item>

                <Form.Item label="Метро">
                    <Select
                        style={{ width: '100%' }}
                        value={formik.values.underground}
                        onChange={(selectedOption) => formik.setFieldValue('underground', selectedOption)}
                        options={undergrounds.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                    />

                    {formik.errors.underground ? <span className="form__err-msg">{formik.errors.underground}</span> : null}
                </Form.Item>
                
                {formError.isError && (
                    <span className="form__err-msg">{formError.message}</span>
                )}

                <button type='submit' disabled={!formik.dirty || formik.isSubmitting} className='button button--blue form__submit'>Изменить</button>
             </Form>
        </Spin>
    );
};
