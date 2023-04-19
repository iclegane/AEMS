import React from 'react';
import Icon from '@components/Icon';
import './index.scss';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MENU_ITEMS } from '../../utils/menu';
import { useRole } from '../../hooks/useRole';


export const DashboardMenu: React.FC = () => {

    const role = useRole();
 
    const menu = MENU_ITEMS[role] || [];

    return (
        <div className="dashboard-menu">
            {menu && menu.map((block) => (
                <div key={uuidv4()} className="dashboard-menu__block">
                    <div className="dashboard-menu__title">{block.title}</div>
                    {block.items.map((menuItem) => (
                        <NavLink end to={menuItem.href} key={uuidv4()}
                        className={(match) =>
                            match.isActive  ? 'link dashboard-menu__item dashboard-menu__item--active' : 'link dashboard-menu__item'}
                        >
                        <span className="link__icon">
                                <Icon name={menuItem.icon} />
                        </span>
                            <span className='link__text'>{menuItem.text}</span>
                        </NavLink>
                    ))}
                </div>
            ))}
        </div>
    );
};

