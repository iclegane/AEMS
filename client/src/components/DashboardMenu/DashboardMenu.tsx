import React from 'react';
import Icon from '@components/Icon';
import './index.scss';
import {Link} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {menu} from '../../utils/menu';


export const DashboardMenu: React.FC = () => {
    return (
        <div className="dashboard-menu">
            {menu && menu.map((block) => {return (
                <div key={uuidv4()} className="dashboard-menu__block">
                    <div className="dashboard-menu__title">{block.title}</div>
                    {block.items.map((menuItem) => {return (
                        <Link to={menuItem.href} key={uuidv4()} className='link dashboard-menu__item'>
                           <span className="link__icon">
                                <Icon name={menuItem.icon} />
                           </span>
                            <span className='link__text'>{menuItem.text}</span>
                        </Link>
                    );})}
                </div>
            );})}
        </div>
    );
};
