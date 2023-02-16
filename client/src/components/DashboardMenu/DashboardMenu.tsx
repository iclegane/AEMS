import React from 'react';
import Icon from '@components/Icon';
import './index.scss';
import {Link} from 'react-router-dom';

export const DashboardMenu: React.FC = () => {
    return (
        <div className="dashboard-menu">
            <div className="dashboard-menu__block">
                <div className="dashboard-menu__title">Главное меню</div>
                <div className="dashboard-menu__item-list">
                    <Link to="/system" className='link dashboard-menu__item'>
                       <span className="link__icon">
                            <Icon name="category"/>
                        </span>
                        <span className='link__text'>Главная</span>
                    </Link>

                    <Link to="/system/profile" className='link dashboard-menu__item'>
                       <span className="link__icon">
                            <Icon name="user"/>
                        </span>
                        <span className='link__text'>Профиль</span>
                    </Link>

                    <Link to="/system/tasks" className='link dashboard-menu__item'>
                       <span className="link__icon">
                            <Icon name="chart"/>
                        </span>
                        <span className='link__text'>Задачи</span>
                    </Link>
                </div>
            </div>
            <div className="dashboard-menu__block">
                <div className="dashboard-menu__title">Компания</div>
                <div className="dashboard-menu__item-list">
                    <a href="/" className='link dashboard-menu__item'>
                        <span className="link__icon">
                            <Icon name="calendar"/>
                        </span>
                        <span className='link__text'>Календарь</span>
                    </a>

                    <a href="/" className='link dashboard-menu__item'>
                        <span className="link__icon">
                            <Icon name="users"/>
                        </span>
                        <span className='link__text'>Сотрудники</span>
                    </a>
                </div>
            </div>
            <div className="dashboard-menu__block">
                <div className="dashboard-menu__title">Общее</div>
                <div className="dashboard-menu__item-list">
                    <a href="/" className='link dashboard-menu__item'>
                        <span className="link__icon">
                            <Icon name="file"/>
                        </span>
                        <span className='link__text'>Файлы</span>
                    </a>

                    <a href="/" className='link dashboard-menu__item'>
                        <span className="link__icon">
                            <Icon name="setting"/>
                        </span>
                        <span className='link__text'>Настройки</span>
                    </a>
                </div>
            </div>
        </div>
    );
};
