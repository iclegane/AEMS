import * as Yup from 'yup';
import { Types } from 'mongoose';
import moment from 'moment';


const objectIdSchema = Yup.string().test({
    name: 'is-object-id',
    message: 'Invalid ObjectID',
    test: (value) => Types.ObjectId.isValid(value as string)
});

const nameSchema = Yup.string()
    .trim()
    .min(5, '2 символа минимально.')
    .max(30, '30 символов максимум.')
    .matches(/(?:[A-Za-z]+\s){2}[A-Za-z]+/, {
        message: 'ФИО должно состоять из 3 частей'
    }
);

const addressSchema = Yup.string().trim();

const phoneSchema = Yup.string().trim();

const emailSchema = Yup.string().email();

const birthDateSchema = Yup.string()
    .test((value) => moment(value, 'DD.MM.YYYY').isValid())
    .test('after-1950', 'Date must be after 01.01.1950', value => moment(value, 'DD.MM.YYYY').isAfter('1950-01-01', 'year'));

const workDateSchema = Yup.string().test((value) => moment(value, 'DD.MM.YYYY').isValid());

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

export const UserAdminCreateSchema = Yup.object().shape({
    name: nameSchema.required(),
    email: emailSchema.required(),
    password: Yup.string().required(),
    post: objectIdSchema.required(),
    role: objectIdSchema.required(),
    skill: Yup.array().of(objectIdSchema.required()).required(),
});

export const UserAdminGetSchema = Yup.object().shape({
    userID: objectIdSchema.required()
});

export const UserAdminUpdateSchema = Yup.object().shape({
    name: nameSchema.required(),
    email: emailSchema.required(),
    phone: phoneSchema.required(),
    address: addressSchema.required(),
    birth_date: birthDateSchema.required(),
    work_date: workDateSchema.required(),
    post: objectIdSchema.required(),
    role: objectIdSchema.required(),
    gender: objectIdSchema.required(),
    skill: Yup.array().of(objectIdSchema.required()).required(),
    underground: objectIdSchema.required(),
});
