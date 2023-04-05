import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { IUser, UserRole } from '../../../../models/IUser';


export interface IAddUserFromFields extends Omit<Partial<IUser>, 'confirmPassword'> {
    confirmPassword: string;
    password: string;
}

export type AddUserFormSelectOption = {
    readonly key: string;
    readonly value: UserRole;
    readonly label: string;
}

export interface AddUserResponse {
    data?: IUser;
    error?: FetchBaseQueryError | SerializedError | unknown;
}
