export interface IUser {
    id: string;
    email:string;
    name: string | null;
    post: string | null;
    role: string;
    isActivated: boolean;
}