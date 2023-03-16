import {IFieldItem} from "../components/FieldList/FieldItem";
import {fieldsEnum} from "./enums";

export function profileFormatData(obj: {[key:string]:string | null | string[]}): IFieldItem[] {
    return Object.entries(obj).map((el) => {
        return {
            name: fieldsEnum[el[0] as keyof typeof fieldsEnum],
            value: el[1] || 'Не заполненно',
        };
    })
}
