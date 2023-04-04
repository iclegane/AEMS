
export type UserRole = 'Admin' | 'User' | 'Manager' | 'Guest';

export interface IUser {
    id: string;
    name: string;
    email:string;
    post: string | null;
    role: UserRole;
}
