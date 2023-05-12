import React from 'react';
import Icon from '@components/Icon';
import './index.scss';
import { Dropdown } from 'antd';
import { useAppSelector } from '../../hooks/redux';
import { UserPanelElements } from '../../utils/UserPanelElements';
 

export const UserPanel: React.FC = () => {

    const { auth } = useAppSelector(state => state.authReducer);

    if (!auth.user) return null;

    return (
        <div className="user-panel">
            <div className="user-panel__avatar" />
            <div className="user-panel__info">
                <div className="user-panel__name">{auth.user.name}</div>
                <div className="user-panel__position">{auth.user.post}</div>
            </div>
            <Dropdown menu={{ items: UserPanelElements }} placement="bottomRight" arrow>
                <button type='button' className="button button--icon user-panel__btn">
                    <Icon name="arrow" />
                </button>
            </Dropdown>
        </div>
    );
};
