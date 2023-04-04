import React from 'react';
import UserPanel from '@components/UserPanel';
import Icon from '@components/Icon/';
import './index.scss';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';


export const Topbar: React.FC = () => {

    const title = useSelector((state: RootState) => state.pageTitle.title);

    return (
        <div className="topbar">
            <div className="topbar__wrapper">
                <div className="topbar__title">{title}</div>
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
