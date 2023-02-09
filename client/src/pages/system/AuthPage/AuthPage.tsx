import React from 'react';
import IllustrationLayout from "@layouts/IllustrationLayout";
import './index.scss';
// @ts-ignore
import Logo from '@assets/icons/logo-without-text.svg';
// @ts-ignore
import Picture from '@assets/images/abstract/1.svg';
import AuthForm from "@components/Forms/AuthForm";


export const AuthPage: React.FC = () => {
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
