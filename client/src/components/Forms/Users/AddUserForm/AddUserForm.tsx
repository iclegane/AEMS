import React, {useState} from "react";
import {useFormik} from "formik";
import {Progress, Result, Select, Spin} from 'antd';
import {SignUpSchema} from "../../../../utils/validationSchemes";
import {useAddUserMutation} from "../../../../api/users";
import {AddUserFormSelectOption, AddUserResponse, IAddUserFromFields} from "./types";

const values: IAddUserFromFields = {
    name: '',
    password: '',
    confirmPassword: '',
    role: undefined,
    email: '',
    post: null,
};

const roles: AddUserFormSelectOption[] = [
    {
        key: 'User',
        value: 'User',
        label: 'User',
    },
    {
        key: 'Manager',
        value: 'Manager',
        label: 'Manager',
    },
];

export const AddUserForm: React.FC = () => {

    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const [addUser, { isLoading: isAddingUser }] = useAddUserMutation();
    const [complete, setComplete] = useState<number>(0);

    const startClosingTimer = (onTimerComplete = () => {}) => {
        const timer = setInterval(() => {
            setComplete((prevComplete) => {
                const nextComplete = prevComplete + 5;

                if (nextComplete === 100) {
                    setTimeout(() => {
                        setComplete(0);
                        onTimerComplete();
                        clearInterval(timer);
                    }, 2000);
                }

                return nextComplete;
            });
        }, 100);
    };

    const formik = useFormik({
        initialValues: values,
        initialStatus: false,
        validationSchema: SignUpSchema,
        onSubmit: async (formData: IAddUserFromFields, actions) => {
            const { confirmPassword, ...userData } = formData;
            const response: AddUserResponse = await addUser(userData);

            setIsSuccess(!!response.data);

            startClosingTimer(() => {
                setIsSuccess(null);
                actions.resetForm();
            });
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formik.handleSubmit(e);
    };

    const Message = () => {
        return (
            <>
                <Result
                    status={isSuccess ? "success" : "error"}
                    title={isSuccess ? "Successfully Added User" : "Submission Failed"}
                    subTitle={isSuccess ? "New user has been added successfully." : "Please check and modify the form before resubmitting."}
                />
                <Progress percent={complete} />
            </>
        )
    }

    const Form = () => {
        return (
            <form className='form' onSubmit={handleSubmit}>
                <h2 className={'text-center'}>Add new User</h2>
                <div className='form-group'>
                    <label htmlFor="name">Имя</label>
                    <input
                        id='name'
                        name='name'
                        type="text"
                        placeholder='Ivanov Ivan Ivanovich'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name ? <span className="form__err-msg">{formik.errors.name}</span> : null}
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Почта</label>
                    <input
                        id='email'
                        name='email'
                        type="email"
                        placeholder='host@reg.ru'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email ? <span className="form__err-msg">{formik.errors.email}</span> : null}
                </div>
                <div className='form-group'>
                    <label htmlFor="role">Роль</label>
                    <Select
                        labelInValue
                        defaultValue={undefined}
                        options={roles}
                        value={formik.values.role ? { key: formik.values.role, value: formik.values.role, label: formik.values.role } : undefined}
                        onBlur={() => formik.setFieldTouched('role', true)}
                        onChange={(selectedOption) => formik.setFieldValue('role', selectedOption.key)}
                        className={formik.errors.role && formik.touched.role ? 'form__select form__select--error' : 'form__select'}
                    />
                    {formik.errors.role && formik.touched.role ? <div className="form__err-msg">{formik.errors.role}</div> : null}
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Пароль</label>
                    <input
                        id='password'
                        name='password'
                        type="password"
                        placeholder='****'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password ? <span className="form__err-msg">{formik.errors.password}</span> : null}
                </div>
                <div className='form-group'>
                    <label htmlFor="confirmPassword">Повторите пароль</label>
                    <input
                        id='confirmPassword'
                        name='confirmPassword'
                        type="password"
                        placeholder='****'
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                    />
                    {formik.errors.confirmPassword ? <span className="form__err-msg">{formik.errors.confirmPassword}</span> : null}
                </div>

                <button type="submit" disabled={isAddingUser} className='button button--blue button--full-width button--center form__submit'>Добавить</button>
            </form>
        );
    }

    return(
        <Spin spinning={isAddingUser}>
            {isSuccess === null && Form()}
            {isSuccess !== null && Message()}
        </Spin>
    )
}
