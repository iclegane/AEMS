import React from 'react';
import './index.scss';
import {useNavigate} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {logout} from '../../../store/actions/AuthAction';
import Icon from '../../../components/Icon';
import {useGetProfileQuery} from '../../../api/profile';
import {fieldsEnum} from '../../../utils/enums';


export const ProfilePage: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {auth} = useAppSelector(state => {return state.authReducer;});

    if (!auth.user) {
        return null;
    }

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };

    const {data, isError} = useGetProfileQuery({});

    if (isError) {
       return (
           <div>Error</div>
       );
    }

    return (
        <div className="profile gap-30">
            <div className="dashboard-content-block">
                <div className='inline-flex gap-25'>
                    <div className="profile__user-image" />
                    <div className="flex flex-column">
                        <div className="profile__user-name">John Doe</div>
                        <div className="profile__user-position">Backend developer</div>
                    </div>
                </div>
                <button type="button" className="button button--icon profile__logout" onClick={logoutHandler}>
                    <Icon name="logout"/>
                </button>
            </div>
            <div className="flex gap-30">
                <div className="dashboard-content-block profile__important">
                    <div className="dashboard-content-block__title">Важное</div>
                    <div className="field-list">
                        {data && Object.entries(data.important).map(([key, value]) =>
                            {return <div key={uuidv4()} className="field field--column">
                                <div className="field__name">{fieldsEnum[key as keyof typeof fieldsEnum] || ''}</div>
                                <div className="field__value">
                                    {(Array.isArray(value) && value.map((el) => {return <span key={uuidv4()} className='badge'>{el}</span>;})) || (value
                                        || 'Не заполненно')
                                    }
                                </div>
                            </div>;}
                        )}
                    </div>
                </div>

                <div className="flex flex-column flex-grow-1 gap-30">
                    <div className="dashboard-content-block">
                        <div className="dashboard-content-block__title">Персональные данные</div>
                        <div className="field-list">
                            {data && Object.entries(data.personal).map(([key, value]) =>
                                {return <div key={uuidv4()} className="field field--alternating">
                                    <div className="field__name">{fieldsEnum[key as keyof typeof fieldsEnum] || ''}</div>
                                    <div className="field__value">
                                        {(Array.isArray(value) && value.map((el) => {return <span key={uuidv4()} className='badge'>{el}</span>;})) ||
                                            (value || 'Не заполненно')
                                        }
                                    </div>
                                </div>;}
                            )}
                        </div>
                    </div>
                    <div className="dashboard-content-block">
                        <div className="dashboard-content-block__title">Контакты</div>
                        <div className="field-list">
                            {data && Object.entries(data.contacts).map(([key, value]) =>
                                {return <div key={uuidv4()} className="field field--alternating">
                                    <div className="field__name">{fieldsEnum[key as keyof typeof fieldsEnum] || ''}</div>
                                    <div className="field__value">
                                        {(Array.isArray(value) && value.map((el) => {return <span key={uuidv4()} className='badge'>{el}</span>;})) ||
                                            (value || 'Не заполненно')
                                        }
                                    </div>
                                </div>;}
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
