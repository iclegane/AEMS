import * as Yup from 'yup';


export const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Почта должна соответсвтовать - example@email.com')
        .min(2, '2 символа минимально.')
        .max(30, '30 символов максимум.')
        .required('Обязательное поле'),
    password: Yup.string()
        .min(5, '5 символов минимально.')
        .max(30, '30 символов максимум.')
        .required('Обязательное поле'),
});

export const ProfilePersonalSchema = Yup.object().shape({
    name: Yup.string()
        .trim('xz')
        .min(5, '2 символа минимально.')
        .max(30, '30 символов максимум.')
        .matches(/(?:[A-Za-z]+\s){2}[A-Za-z]+/, {
            message: 'ФИО должно состоять из 3 частей'
        })
        .required('Обязательное поле'),
    birth_date: Yup.date()
        .required('Обязательное поле'),
    gender: Yup.string()
        .required('Обязательное поле'),
});
