import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ReactModal from 'react-modal';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {logout} from '../../../store/actions/AuthAction';
import Icon from '../../../components/Icon';
import {useGetProfileQuery} from '../../../api/profile';
import PersonalForm from '../../../components/Forms/Profile/PersonalForm';
import ContactForm from '../../../components/Forms/Profile/ContactForm';
import {ProfileEditTypes} from './types';
import FieldList from '../../../components/FieldList';
import {profileFormatData} from '../../../utils/profileFormatData';
import './index.scss';
import Page from "../../../components/Page";


interface ProfilePageProps {
    title: string;
}

export const ProfilePage: React.FC<React.PropsWithChildren<ProfilePageProps>> = ({ title, children, ...rest }) => {

    const [open, setOpen] = useState(false);
    const [type, setType] = useState<ProfileEditTypes>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {auth} = useAppSelector(state => {return state.authReducer;});

    if (!auth.user) return null;

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };

    const onChangeBlock = (type: ProfileEditTypes) => {
        setType(type);
        setOpen((prevState) => {return !prevState;});
    };

    const {data, isError} = useGetProfileQuery({});

    if (isError) return <div>Error</div>;

    return (
        <Page title={title}>
            <div className="profile gap-30">
                <div className="dashboard-content-block">
                    <div className='inline-flex gap-25'>
                        <div className="profile__user-image" />
                        <div className="flex flex-column">
                            <div className="profile__user-name">{auth.user.name}</div>
                            <div className="profile__user-position">{auth.user.post}</div>
                        </div>
                    </div>
                    <button type="button" className="button button--icon profile__logout" onClick={logoutHandler}>
                        <Icon name="logout"/>
                    </button>
                </div>
                <div className="flex gap-30">
                    <div className="dashboard-content-block profile__important">
                        <div className="dashboard-content-block__title">Важное</div>
                        {data && data.important && (
                            <FieldList type="column" elements={profileFormatData(data.important)}/>
                        )}
                    </div>
                    <div className="flex flex-column flex-grow-1 gap-30">
                        <div className="dashboard-content-block">
                            <button
                                type="button"
                                className="button button--text profile__change-btn"
                                onClick={() => {return onChangeBlock('personal');}}
                            >
                                <Icon name="edit"/>
                            </button>
                            <div className="dashboard-content-block__title">Персональные данные</div>
                            {data && data.personal && (
                                <FieldList view="alternating" elements={profileFormatData(data.personal)}/>
                            )}
                        </div>
                        <div className="dashboard-content-block">
                            <button
                                type="button"
                                className="button button--text profile__change-btn"
                                onClick={() => {return onChangeBlock('contacts');}}
                            >
                                <Icon name="edit"/>
                            </button>
                            <div className="dashboard-content-block__title">Контакты</div>
                            {data && data.contacts && (
                                <FieldList view="alternating" elements={profileFormatData(data.contacts)}/>
                            )}
                        </div>
                    </div>
                </div>
                <ReactModal
                    isOpen={open}
                    className="default-modal__content"
                    overlayClassName="default-modal"
                    shouldCloseOnOverlayClick
                    shouldCloseOnEsc
                    onRequestClose={() => {return setOpen(false);}}
                    contentLabel="Profile"
                    appElement={document.getElementById('root') || undefined}
                >
                    {type === 'personal' &&
                        <>
                            <h2>Персональные данные</h2>
                            <PersonalForm data={{
                                name: data?.personal.name,
                                birth_date: data?.personal.birth_date,
                                gender: data?.personal.gender,
                            }}/>
                        </>
                    }

                    {type === 'contacts' &&
                        <>
                            <h2>Контакты</h2>
                            <ContactForm data={{
                                address: data?.contacts.address,
                                phone: data?.contacts.phone
                            }}/>
                        </>
                    }
                </ReactModal>
            </div>
        </Page>
    );
};
