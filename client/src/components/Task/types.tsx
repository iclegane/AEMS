export interface ITask {
    id: number;
    index: number;
    name: string;
    created: string;
    deadline: string;
    status: string;
    manager: string | null;
}
