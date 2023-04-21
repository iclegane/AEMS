import React from 'react';
import { useFormik } from 'formik';
import { SignInSchema } from '@utils/validationSchemes';
import { Form, Input, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/redux';
import { login } from '../../../store/actions/AuthAction';
import { RootState } from '../../../store/store';


export const AuthForm: React.FC = () => {

    const dispatch = useAppDispatch();
    const { error: authError, isLoading: isLoginLoading } = useSelector((state: RootState) => state.authReducer);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        initialStatus: false,
        validationSchema: SignInSchema,
        onSubmit: async (formData) => {
            await dispatch(login(formData));
        },
    });

    return (
        <Spin spinning={isLoginLoading}>
            <Form layout="vertical" onSubmitCapture={formik.handleSubmit}>
                <Form.Item label="Почта">
                    <Input name='email' placeholder="test@test.com" value={formik.values.email} onChange={formik.handleChange} />
                    {formik.errors.email ? <span className="form__err-msg">{formik.errors.email}</span> : null}
                </Form.Item>

                <Form.Item label="Пароль">
                    <Input name='password' type='password' placeholder="*****" value={formik.values.password} onChange={formik.handleChange} />
                    {formik.errors.password ? <span className="form__err-msg">{formik.errors.password}</span> : null}
                </Form.Item>

                <span className="form__err-msg">{authError}</span>

                <div className="form-group">
                    <a href="/" className='form__action'>Забыли пароль?</a>
                </div>

                <button type="submit" disabled={!formik.dirty || formik.isSubmitting} className='button button--blue button--full-width button--center form__submit'>Отправить</button>

                <div className="form__info">Don’t have account yet?</div>
            </Form>
        </Spin>
    );
};
