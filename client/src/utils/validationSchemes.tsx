import * as Yup from 'yup';
import dayjs from 'dayjs';


const nameSchema = Yup.string()
.trim()
.min(5, '2 символа минимально.')
.max(30, '30 символов максимум.')
.matches(/^(?:[А-Яа-яA-Za-z]+\s){2}[А-Яа-яA-Za-z]+$/, {
    message: 'ФИО должно состоять из 3 частей'
});

const birthDateSchema = Yup.string().test('valid-date', 'Некорректная дата рождения', (value) => {
    if (!value) return false;
    const date = dayjs(value, 'DD.MM.YYYY');
    const minDate = dayjs('01.01.1970', 'DD.MM.YYYY');
    return date.isValid() && date.isAfter(minDate);
});

const genderSchema = Yup.string();

const phoneSchema = Yup.string().matches(/^[(]?7{1}[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
    message: 'от 10 до 15 символов, состоит из цифр, начинается с 7.'
});

const addressSchema = Yup.string()
.trim()
.min(5, '5 символов минимально.')
.max(35, '35 cимволов максимально.');

const undergroundSchema = Yup.string();

const emailSchema = Yup.string()
    .email('Почта должна соответсвтовать - example@email.com')
    .min(2, '2 символа минимально.')
    .max(30, '30 символов максимум.');

const passwordSchema = Yup.string()
.min(5, '5 символов минимально.')
.max(30, '30 символов максимум.');

const taskNameSchema = Yup.string()
.trim()
.min(5, '2 символа минимально.')
.max(30, '30 символов максимум.');

const taskDescriptionSchema = Yup.string()
.trim()
.min(5, '2 символа минимально.')
.max(30, '30 символов максимум.');
 


export const SignInSchema = Yup.object().shape({
    email: emailSchema.required('Обязательное поле'),
    password: passwordSchema.required('Обязательное поле'),
});

export const ProfilePersonalSchema = Yup.object().shape({
    name: nameSchema.required('Обязательное поле'),
    birth_date: birthDateSchema,
    gender: genderSchema.required('Обязательное поле'),
});

export const ProfileContactsSchema = Yup.object().shape({
    address: addressSchema,
    phone: phoneSchema,
    underground: undergroundSchema.required('Обязательное поле')
});

export const AddTaskFormSchema = Yup.object().shape({
    name: taskNameSchema.required('Обязательное поле'),
    description: taskDescriptionSchema.required('Обязательное поле'),
    deadline: Yup.string().required('Обязательное поле'),
    body: Yup.string().trim().required('Обязательное поле'),
    performerID: Yup.string().trim().required('Обязательное поле'),
});

export const AddUserFormSchema = Yup.object().shape({
    name: nameSchema.required('Обязательное поле'),
    email: emailSchema.required('Обязательное поле'),
    role: Yup.string().required('Обязательное поле'),
    password: passwordSchema.required('Обязательное поле'),
    confirmPassword: passwordSchema.oneOf([Yup.ref('password')], 'Пароль должен совпадать').required('Обязательное поле'),
});

export const UpdateUserFormSchema = Yup.object().shape({
    name: nameSchema.required('Обязательное поле'),
    email: emailSchema.required('Обязательное поле'),
    phone: phoneSchema,
    birth_date: birthDateSchema,
    work_date: birthDateSchema,
    role: Yup.string().required('Обязательное поле'),
    gender: genderSchema.required('Обязательное поле'),
});
