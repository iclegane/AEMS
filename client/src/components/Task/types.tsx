export interface ITask {
    id: string;
    index: number;
    name: string;
    created: string;
    deadline: string;
    status: string;
    manager: string | null;
}
