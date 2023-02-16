import React, {useEffect} from 'react';
import IllustrationLayout from '@layouts/IllustrationLayout';
import './index.scss';
// @ts-ignore
import Logo from '@assets/icons/logo-without-text.svg';
// @ts-ignore
import Picture from '@assets/images/abstract/1.svg';
import AuthForm from '@components/Forms/AuthForm';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../../hooks/redux';


export const AuthPage: React.FC = () => {

    const navigate = useNavigate();
    const {auth} = useAppSelector(state => {return state.authReducer;});

    useEffect(() => {
        if (auth.isAuth) navigate('/system');
    }, [navigate, auth]);

    return (
        <div className="page page--auth">
            <IllustrationLayout imageUrl={Picture}>
                <div className="form-block">
                    <div className="form-block__header">
                        <div className="form-block__logo">
                            <img src={Logo} alt=""/>
                        </div>
                        <div className='form-block__title'>Log in</div>
                    </div>
                    <AuthForm/>
                </div>
            </IllustrationLayout>
        </div>
    );
};
