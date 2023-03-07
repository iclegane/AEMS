import React from 'react';
import {useFormik} from "formik";
import {ProfilePersonalSchema} from "../../../../utils/validationSchemes";
import {useUpdateProfileMutation} from "../../../../api/profile";
import {IContactForm} from "./types";


export const ContactForm: React.FC<{data: IContactForm}> = (props) => {

    const {address, phone} = props.data;
    const [UpdateProfile] =  useUpdateProfileMutation();
    const formik = useFormik({
        initialValues: {
            address,
            phone
        },
        initialStatus: false,
        validationSchema: ProfilePersonalSchema,
        onSubmit: async (formData) => {
            await UpdateProfile({
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
            <button type='submit' className='button button--blue form__submit'>Изменить</button>
        </form>
    );
};
