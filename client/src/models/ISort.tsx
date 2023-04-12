export type sortTypes = 1 | -1 | null;

export interface ISort {
    field: string;
    type: sortTypes;
}
