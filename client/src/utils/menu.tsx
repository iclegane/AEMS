import {IconNames} from "../components/Icon";

type menu = {
    text: string,
    href: string,
    icon: IconNames,
}
type menuBlock = {
    title: string;
    items: menu[]
}

export const menu: menuBlock[] = [
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
                href: '/',
                icon: 'calendar',
            },
            {
                text: 'Сотрудники',
                href: '/',
                icon: 'users',
            }
        ],
    },
    {
        title: 'Общее',
        items: [
            {
                text: 'Файлы',
                href: '/',
                icon: 'file',
            },
            {
                text: 'Настройки',
                href: '/',
                icon: 'setting',
            },
        ],
    }
]
