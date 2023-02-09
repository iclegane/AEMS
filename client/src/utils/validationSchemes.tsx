import * as Yup from "yup";

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
