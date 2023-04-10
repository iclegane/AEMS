import { MenuProps } from 'antd';
import React from 'react';


export const UserPanelElements: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <button type="button" className="button button--text">
                Выйти
            </button>
        ),
    },
];
