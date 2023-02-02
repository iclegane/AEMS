import React from "react";
import "./index.scss";

const Navbar: React.FC = () => {
    return (
        <>
            <div className="dashboard-menu">
                <div className="dashboard-menu__block">
                    <div className="dashboard-menu__title">Главное меню</div>
                    <div className="dashboard-menu__item-list">
                        <a href="#" className="dashboard-menu__item">Главная страница</a>
                        <a href="#" className="dashboard-menu__item">Страница пользователя</a>
                        <a href="#" className="dashboard-menu__item">Задачи</a>
                    </div>
                </div>
                <div className="dashboard-menu__block">
                    <div className="dashboard-menu__title">Компания</div>
                    <div className="dashboard-menu__item-list">
                        <a href="#" className="dashboard-menu__item">Календарь</a>
                        <a href="#" className="dashboard-menu__item">Сотрудники</a>
                        <a href="#" className="dashboard-menu__item">Задачи</a>
                    </div>
                </div>
                <div className="dashboard-menu__block">
                    <div className="dashboard-menu__title">Общее</div>
                    <div className="dashboard-menu__item-list">
                        <a href="#" className="dashboard-menu__item">Файлы</a>
                        <a href="#" className="dashboard-menu__item">Настройки</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;
