export type UserRole = 'Admin' | 'User' | 'Manager' | 'Guest';

export interface IUser {
    id: string;
    name: string;
    email:string;
    post: string | null;
    role: UserRole;
}

export type UserInfoDtoField = {
    id: string;
    name: string;
}

export interface UserInfoDto {
    id: string;
    name: string | null;
    email: string;
    address: string | null;
    phone: string | null;
    birth_date: string | null;
    work_date: string;
    post: UserInfoDtoField | null;
    role: UserInfoDtoField | null;
    gender: UserInfoDtoField | null;
    skill: UserInfoDtoField[];
    underground: UserInfoDtoField | null;
}

export interface IUpdateUserRequestData {
    name: string | null;
    email: string;
    address: string | null;
    phone: string | null;
    birth_date: string | null;
    work_date: string;
    post: string | null;
    role: string | null;
    gender: string | null;
    skill: string[];
    underground: string | null;
}
