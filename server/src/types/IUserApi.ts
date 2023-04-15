export interface ICreateUserRequestData {
    name: string;
    email: string;
    password: string;
    post: string;
    role: string;
    skill: string[];
}

export interface IUpdateUserRequestData {
    address: string;
    birth_date: string;
    work_date: string;
    email: string;
    gender: string;
    name: string;
    phone: string;
    post: string;
    role: string;
    skill: string[];
    underground: string;
}
