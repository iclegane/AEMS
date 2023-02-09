import React from "react";
import { useFormik } from 'formik';
import { IAuthFields } from "./types";
import { SignInSchema } from "@utils/validationSchemes";


export const AuthForm: React.FC = () => {

    const values: IAuthFields = {
        email: '',
        password: ''
    }

    const formik = useFormik({
        initialValues: values,
        validationSchema: SignInSchema,
        onSubmit: values => {
            console.log(values);
        },
    });

    return(
        <form className='form' onSubmit={formik.handleSubmit}>
            <div className='form-group'>
                <label htmlFor="email">Почтовый адрес</label>
                <input
                    name='email'
                    type="email"
                    placeholder='example@gmail.com'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email ? <span className={'form__err-msg'}>{formik.errors.email}</span> : null}
            </div>

            <div className='form-group'>
                <label htmlFor="password">Пароль</label>
                <input
                    name='password'
                    type="password"
                    placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password ? <span className={'form__err-msg'}>{formik.errors.password}</span> : null}
            </div>

            <div className="form-group">
                <a href="/" className='form__action'>Забыли пароль?</a>
            </div>

            <button type="submit" className='button button--blue button--full-width button--center form__submit'>Отправить</button>

            <div className="form__info">Don’t have account yet?</div>
        </form>
    )
}
