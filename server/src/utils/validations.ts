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
    .matches(/^(?:[А-Яа-яA-Za-z]+\s){2}[А-Яа-яA-Za-z]+$/, {
        message: 'ФИО должно состоять из 3 частей'
    });

const addressSchema = Yup.string().trim();

const phoneSchema = Yup.string().matches(/^[(]?7{1}[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
    message: 'от 10 до 15 символов, состоит из цифр, начинается с 7.'
});

const emailSchema = Yup.string().email();

const passwordSchema = Yup.string().trim();

const birthDateSchema = Yup.string()
    .test((value) => moment(value, 'DD.MM.YYYY').isValid())
    .test('after-1950', 'Date must be after 01.01.1950', value => moment(value, 'DD.MM.YYYY').isAfter('1950-01-01', 'year'));

const workDateSchema = Yup.string().test((value) => moment(value, 'DD.MM.YYYY').isValid());

const DateSchema = Yup.string().test((value) => moment(value, 'DD.MM.YYYY').isValid());

export const ProfilePersonalSchema = Yup.object().shape({
    name: nameSchema.nullable().notRequired(),
    birth_date: Yup.lazy((value) => value !== undefined
            ? birthDateSchema
            : Yup.string().notRequired()),
    gender: Yup.lazy((value) => value !== undefined
            ? objectIdSchema
            : Yup.string().notRequired()),
    address: Yup.string().notRequired(),
    phone: phoneSchema.nullable().notRequired(),
    underground: Yup.lazy((value) => value !== undefined
            ? objectIdSchema
            : Yup.string().notRequired())
});

export const AuthLoginSchema = Yup.object().shape({
    email: emailSchema.required(),
    password: passwordSchema.required(),
});

export const UserAdminCreateSchema = Yup.object().shape({
    name: nameSchema.required(),
    email: emailSchema.required(),
    password: passwordSchema.required(),
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

export const TasksListSchema = Yup.object().shape({
    page: Yup.number().integer().min(1),
    limit: Yup.number().integer().min(1),
    sortJson: Yup.string(),
    filterJson: Yup.string(),
});

export const TasksDetailSchema = Yup.object().shape({
    id: objectIdSchema.required()
});

export const TasksUpdateSchema = Yup.object().shape({
    id: objectIdSchema.required(),
    status: Yup.lazy((value) => value !== undefined
        ? objectIdSchema
        : Yup.string().notRequired())
});

export const VacationCreateSchema = Yup.object().shape({
    start: DateSchema.required(),
    end: DateSchema.required(),
    days: Yup.number().required()
});
