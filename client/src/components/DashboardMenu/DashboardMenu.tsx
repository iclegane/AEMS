import React from 'react';
import Icon from '@components/Icon';
import './index.scss';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { menu } from '../../utils/menu';


export const DashboardMenu: React.FC = () => (
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
