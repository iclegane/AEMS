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

export const SignUpSchema = Yup.object().shape({
    name: Yup.string()
        .trim()
        .min(5, '2 символа минимально.')
        .max(30, '30 символов максимум.')
        .matches(/(?:[A-Za-z]+\s){2}[A-Za-z]+/, {
            message: 'ФИО должно состоять из 3 частей'
        })
        .required('Обязательное поле'),
    email: Yup.string().email('Почта должна соответсвтовать - example@email.com')
        .min(2, '2 символа минимально.')
        .max(30, '30 символов максимум.')
        .required('Обязательное поле'),
    role: Yup.string().required('Обязательное поле'),
    password: Yup.string()
        .min(5, '5 символов минимально.')
        .max(30, '30 символов максимум.')
        .required('Обязательное поле'),
    confirmPassword: Yup.string()
        .required('Обязательное поле')
        .oneOf([Yup.ref('password')], 'Пароль должен совпадать'),
});

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
    underground: Yup.string().required('Обязательное поле')
});

export const AddTaskFormSchema = Yup.object().shape({
    name: Yup.string()
        .trim()
        .min(5, '2 символа минимально.')
        .max(30, '30 символов максимум.')
        .required('Обязательное поле'),
    description: Yup.string()
        .trim()
        .min(5, '2 символа минимально.')
        .max(30, '30 символов максимум.')
        .required('Обязательное поле'),
    deadline: Yup.string()
        .required('Обязательное поле'),
    body: Yup.string().trim().required('Обязательное поле'),
    performerID: Yup.string().trim().required('Обязательное поле'),
});
