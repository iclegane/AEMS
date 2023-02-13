import React from 'react';
import './index.scss';


export const ProfilePage: React.FC = () => {

    const personalInfo = [
        {
            name: 'Имя',
            value: 'John',
        },{
            name: 'Фамилия',
            value: 'Doe',
        },{
            name: 'Отчество',
            value: 'Doe',
        },{
            name: 'Электрорнная почта',
            value: 'info@aems.ru',
        },{
            name: 'Дата рождения',
            value: '08.05.1994',
        },{
            name: 'Пол',
            value: 'Мужской',
        },{
            name: 'Соц.Сети',
            value: 'medium.com/user/JohnDoe',
        }];

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
            </div>

            <div className="flex gap-30">
                <div className="dashboard-content-block profile__important">
                    <div className="dashboard-content-block__title">Важное</div>
                    <div className="field-list">
                        {personalInfo && personalInfo.map((field) =>
                            <div className="field field--column">
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
                            {personalInfo && personalInfo.map((field) =>
                                <div className="field field--alternating">
                                    <div className="field__name">{field.name}</div>
                                    <div className="field__value">{field.value}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="dashboard-content-block">
                        <div className="dashboard-content-block__title">Контакты</div>

                        <div className="field-list">
                            {personalInfo && personalInfo.map((field) =>
                                <div className="field field--alternating">
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
