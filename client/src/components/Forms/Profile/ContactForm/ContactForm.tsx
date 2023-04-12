import React from 'react';
import { useFormik } from 'formik';
import { Select, Spin } from 'antd';
import { ProfilePersonalSchema } from '../../../../utils/validationSchemes';
import { useUpdateProfileMutation } from '../../../../api/profile';
import { IContactForm } from './types';
import { useGetUndergroundsQuery } from '../../../../api/underground';


export const ContactForm: React.FC<{data: IContactForm}> = (props) => {

    const { data } = props;
    const { address, phone } = data;

    const [UpdateProfile] =  useUpdateProfileMutation();
    const { data: undergrounds = [], isLoading: isUndergroundsLoading, isError: isUndergroundsError } = useGetUndergroundsQuery({});

    if (isUndergroundsError) {
        return <div>Попробуйте позже</div>;
    }

    const formik = useFormik({
        initialValues: {
            address,
            phone,
            underground: null,
        },
        initialStatus: false,
        validationSchema: ProfilePersonalSchema,
        onSubmit: async (formData) => {
            UpdateProfile({
                contacts: formData
            });
        },
    });

    return(
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
                    options={undergrounds.map((underground) => ({
                        label: underground.name,
                        value: underground.id,
                    }))}
                />
                {formik.errors.underground ? <span className="form__err-msg">{formik.errors.underground}</span> : null}
            </Spin>
            <button disabled={isUndergroundsLoading} type='submit' className='button button--blue form__submit'>Изменить</button>
        </form>
    );
};
