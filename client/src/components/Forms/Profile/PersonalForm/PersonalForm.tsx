import React from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import { ProfilePersonalSchema } from '../../../../utils/validationSchemes';
import { useUpdateProfileMutation } from '../../../../api/profile';
import { IPersonalForm, IPersonalValues } from './types';


export const PersonalForm: React.FC<{data: IPersonalForm}> = (props) => {

    const { name, birth_date, gender } = props.data;

    const [UpdateProfile] =  useUpdateProfileMutation();
    const values: IPersonalValues = {
        name: name || '',
        birth_date: birth_date ? moment(birth_date, 'DD.MM.YYYY').format('YYYY-MM-DD') : '',
        gender: gender || ''
    };

    const formik = useFormik({
        initialValues: values,
        initialStatus: false,
        validationSchema: ProfilePersonalSchema,
        onSubmit: async (formData) => {
            try {
                await UpdateProfile({ personal: formData });

            } catch (error) {

            }
        },
    });

    return(
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
            <div className='form-group'>
                <label htmlFor="birth_date">Дата рождения</label>
                <input
                    id='birth_date'
                    name='birth_date'
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.birth_date}
                />
                {formik.errors.birth_date ? <span className="form__err-msg">{formik.errors.birth_date}</span> : null}
            </div>
            <div className='form-group'>
                <label htmlFor="gender">Пол</label>
                <select
                    name="gender"
                    id="gender"
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                >
                    <option value="Мужской">Мужской</option>
                    <option value="Женский">Женский</option>
                </select>
            </div>
            <button type='submit' className='button button--blue form__submit'>Изменить</button>
        </form>
    );
};
