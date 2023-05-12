import { UserInfoDto } from '../models/IUser';


export const fieldNameMap: Record<keyof UserInfoDto, string> = {
    id: 'ID',
    name: 'ФИО',
    email: 'Почта',
    address: 'Адрес',
    phone: 'Телефон',
    birth_date: 'Дата рождения',
    work_date: 'Дата приема на работу',
    post: 'Должность',
    role: 'Роль',
    gender: 'Пол',
    skill: 'Навыки',
    underground: 'Ближайшее метро',
};
