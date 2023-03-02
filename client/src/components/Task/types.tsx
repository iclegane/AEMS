export interface ITask {
    id: number;
    index: number;
    name: string;
    createdAt: string;
    deadline: string;
    status: string;
    manager: string | null;
}
