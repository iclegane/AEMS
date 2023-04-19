import { IconNames } from '../components/Icon';


type menu = {
    text: string,
    href: string,
    icon: IconNames,
}
type menuBlock = {
    title: string;
    items: menu[]
}

export const adminMenu: menuBlock[] = [
    {
        title: 'Главное меню',
        items: [
            {
                text: 'Главная',
                href: '/system',
                icon: 'category',
            },
            {
                text: 'Профиль',
                href: '/system/profile',
                icon: 'user',
            },
            {
                text: 'Задачи',
                href: '/system/tasks',
                icon: 'chart',
            },
            {
                text: 'Отпуск',
                href: '/system/vacation',
                icon: 'ticket',
            }
        ]
    },
    {
        title: 'Компания',
        items: [
            {
                text: 'Календарь',
                href: '/system/calendar',
                icon: 'calendar',
            },
            {
                text: 'Сотрудники',
                href: '/system/users',
                icon: 'users',
            }
        ],
    },
    {
        title: 'Общее',
        items: [
            {
                text: 'Файлы',
                href: '/system/files',
                icon: 'file',
            },
            {
                text: 'Настройки',
                href: '/system/settings',
                icon: 'setting',
            },
        ],
    }
];

export const managerMenu: menuBlock[] = [
    {
        title: 'Главное меню',
        items: [
            {
                text: 'Главная',
                href: '/system',
                icon: 'category',
            },
            {
                text: 'Профиль',
                href: '/system/profile',
                icon: 'user',
            },
            {
                text: 'Задачи',
                href: '/system/tasks',
                icon: 'chart',
            },
            {
                text: 'Отпуск',
                href: '/system/vacation',
                icon: 'ticket',
            }
        ]
    },
    {
        title: 'Компания',
        items: [
            {
                text: 'Календарь',
                href: '/system/calendar',
                icon: 'calendar',
            },
            {
                text: 'Сотрудники',
                href: '/system/users',
                icon: 'users',
            }
        ],
    }
];

export const userMenu: menuBlock[] = [
    {
        title: 'Главное меню',
        items: [
            {
                text: 'Главная',
                href: '/system',
                icon: 'category',
            },
            {
                text: 'Профиль',
                href: '/system/profile',
                icon: 'user',
            },
            {
                text: 'Задачи',
                href: '/system/tasks',
                icon: 'chart',
            },
            {
                text: 'Отпуск',
                href: '/system/vacation',
                icon: 'ticket',
            }
        ]
    }
];

export const MENU_ITEMS = {
    Admin: adminMenu,
    Manager: managerMenu,
    User: userMenu
};
