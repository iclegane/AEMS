import React from 'react';
import IllustrationLayout from "@layouts/IllustrationLayout";
import './index.scss';
// @ts-ignore
import Logo from '@assets/icons/logo-without-text.svg';
// @ts-ignore
import Picture from '@assets/images/abstract/1.svg';


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
                    <form className='form' action="">
                        <div className='form-group'>
                            <label htmlFor="email">Email Address</label>
                            <input name='email' type="email" placeholder='example@gmail.com'/>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="password">Password</label>
                            <input name='password' type="password" placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'/>
                        </div>

                        <div className="form-group">
                            <a href="/" className='form__action'>Reset Password?</a>
                        </div>

                        <button className='button button--blue button--full-width button--center form__submit'>Log in</button>

                        <div className="form__info">Don’t have account yet?</div>
                    </form>
                </div>
            </IllustrationLayout>
        </div>
    );
};
