import { IFieldItem } from './FieldItem';


export interface IFieldList {
    elements: IFieldItem[];
    type?: 'column';
    view?: 'alternating';
}
