import React, {useState} from 'react';
import {useFormik} from 'formik';
import {SignInSchema} from '@utils/validationSchemes';
import {unwrapResult} from '@reduxjs/toolkit';
import {IAuthFields} from './types';
import {useAppDispatch} from '../../../hooks/redux';
import {login} from '../../../store/actions/AuthAction';


export const AuthForm: React.FC = () => {

    const dispatch = useAppDispatch();
    const [serverError, setServerError] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState('');

    const values: IAuthFields = {
        email: '',
        password: ''
    };
    const formik = useFormik({
        initialValues: values,
        initialStatus: false,
        validationSchema: SignInSchema,
        onSubmit: async (formData, actions) => {

            setServerError(false);
            setServerErrorMessage('');

           try {
               const resultAction = await dispatch(login(formData));
               unwrapResult(resultAction);
           } catch (e) {
               setServerError(true);
               setServerErrorMessage('Неверный логин или пароль');
           } finally {
               actions.resetForm();
           }
        },
    });

    return(
        <form className='form' onSubmit={formik.handleSubmit}>
            <div className='form-group'>
                <label htmlFor="email">Почтовый адрес</label>
                <input
                    id='email'
                    name='email'
                    type="email"
                    placeholder='example@gmail.com'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email ? <span className="form__err-msg">{formik.errors.email}</span> : null}
            </div>

            <div className='form-group'>
                <label htmlFor="password">Пароль</label>
                <input
                    id='password'
                    name='password'
                    type="password"
                    placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password ? <span className="form__err-msg">{formik.errors.password}</span> : null}
            </div>

            <div className="form-group">
                <a href="/" className='form__action'>Забыли пароль?</a>
            </div>

            <button type="submit" className='button button--blue button--full-width button--center form__submit'>Отправить</button>

            {serverError && <span className="form__err-msg">{serverErrorMessage}</span>}

            <div className="form__info">Don’t have account yet?</div>
        </form>
    );
};
