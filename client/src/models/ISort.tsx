export type sortTypes = 'asc' | 'desc' | null;

export interface ISort {
    field: string;
    type: sortTypes;
}
