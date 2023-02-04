import React from 'react';
import UserPanel from '@components/UserPanel';
import Icon from '@components/Icon/';
import './index.scss';

export const Topbar: React.FC = () => {
    return (
        <div className="topbar">
            <div className="topbar__wrapper">
                <div className="topbar__title">Главная страница</div>
                <div className="topbar__actions-block">
                    <div className="button-group">
                        <button type='button' className='button button--icon'>
                            <Icon name="sun"/>
                        </button>

                        <button type='button' className='button button--icon'>
                            <Icon name="notification"/>
                        </button>
                    </div>
                    <div className="topbar__user-block">
                        <UserPanel/>
                    </div>
                </div>
            </div>
        </div>
    );
};
