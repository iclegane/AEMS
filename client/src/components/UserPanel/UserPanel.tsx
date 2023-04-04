import React from 'react';
import Icon from '@components/Icon';
import './index.scss';
import {useAppSelector} from '../../hooks/redux';


export const UserPanel: React.FC = () => {

    const {auth} = useAppSelector(state => state.authReducer);

    if (!auth.user) return null;

    return (
        <div className="user-panel">
            <div className="user-panel__avatar" />
            <div className="user-panel__info">
                <div className="user-panel__name">{auth.user.name}</div>
                <div className="user-panel__position">{auth.user.post}</div>
            </div>
            <button type='button' className="button button--icon user-panel__btn">
                <Icon name="arrow" />
            </button>
        </div>
    );
};
