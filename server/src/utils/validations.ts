import * as Yup from 'yup';


// eslint-disable-next-line import/prefer-default-export
export const ProfilePersonalSchema = Yup.object().shape({
    name: Yup.string()
        .trim()
        .min(5, '2 символа минимально.')
        .max(30, '30 символов максимум.')
        .matches(/(?:[A-Za-z]+\s){2}[A-Za-z]+/, {
            message: 'ФИО должно состоять из 3 частей'
        }),
    birth_date: Yup.date().min(new Date(1970, 0, 1)),
    gender: Yup.string(),
    address: Yup.string()
        .trim()
        .min(5, '5 символов минимально.')
        .max(35, '35 cимволов максимально.'),
    phone: Yup.string().matches(/^[(]?7{1}[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
        message: 'от 10 до 15 символов, состоит из цифр, начинается с 7.'
    }),
    underground: Yup.string()
});
