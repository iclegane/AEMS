import React from 'react';
import './index.scss';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useProfileQuery} from "../../../service/PofileService";
import {logout} from "../../../store/actions/AuthAction";
import Icon from "../../../components/Icon";
import {useNavigate} from "react-router-dom";


export const ProfilePage: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {auth} = useAppSelector(state => state.authReducer);
    const {data} = useProfileQuery({id: auth.user.id});

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <div className="profile gap-30">
            <div className="dashboard-content-block">
                <div className='inline-flex gap-25'>
                    <div className="profile__user-image"></div>
                    <div className="flex flex-column">
                        <div className="profile__user-name">John Doe</div>
                        <div className="profile__user-position">Backend developer</div>
                    </div>
                </div>
                <button type={'button'} className={'button button--icon profile__logout'} onClick={logoutHandler}>
                    <Icon name={'logout'}/>
                </button>
            </div>

            <div className="flex gap-30">
                <div className="dashboard-content-block profile__important">
                    <div className="dashboard-content-block__title">Важное</div>
                    <div className="field-list">
                        {data && data.main.map((field, i) =>
                            <div key={`profile-main-${i}`} className="field field--column">
                                <div className="field__name">{field.name}</div>
                                <div className="field__value">{field.value}</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-column flex-grow-1 gap-30">
                    <div className="dashboard-content-block">
                        <div className="dashboard-content-block__title">Персональные данные</div>

                        <div className="field-list">
                            {data && data.personal.map((field, i) =>
                                <div key={`profile-personal-${i}`} className="field field--alternating">
                                    <div className="field__name">{field.name}</div>
                                    <div className="field__value">{field.value}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="dashboard-content-block">
                        <div className="dashboard-content-block__title">Контакты</div>

                        <div className="field-list">
                            {data && data.contacts.map((field, i) =>
                                <div key={`profile-contacts-${i}`} className="field field--alternating">
                                    <div className="field__name">{field.name}</div>
                                    <div className="field__value">{field.value}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
