import React from 'react';
import {useFormik} from "formik";
import {ProfilePersonalSchema} from "../../../../utils/validationSchemes";
import {useUpdateProfileMutation} from "../../../../api/profile";


interface IPersonalForm {
    name: string;
    birth_date: string;
    gender: string;
}

export const PersonalForm: React.FC = () => {

    const [UpdateProfile] =  useUpdateProfileMutation();
    const values: IPersonalForm = {
        name: '',
        birth_date: '',
        gender: ''
    };
    const formik = useFormik({
        initialValues: values,
        initialStatus: false,
        validationSchema: ProfilePersonalSchema,
        onSubmit: async (formData) => {
            try {
                let data = await UpdateProfile({
                    personal: formData
                });

                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
    });

    return(
        <form className='form' style={{width: 320}} onSubmit={formik.handleSubmit}>
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
                    min={'1940-01-01'}
                    max={'2023-01-01'}
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
                    <option value="1">Мужской</option>
                    <option value="2">Женский</option>
                </select>
            </div>
            <button type='submit' className='button button--blue form__submit'>Изменить</button>
        </form>
    );
};
