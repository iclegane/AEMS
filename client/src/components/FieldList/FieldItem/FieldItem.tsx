import React from "react";
import {IFieldItem} from "./types";
import {v4 as uuidv4} from "uuid";


export const FieldItem: React.FC<IFieldItem> = ({name, value}) => {
    return (
        <div className="field">
            <div className="field__name">{name}</div>
            <div className="field__value">
                {((Array.isArray(value) && value.map((el) => <span key={uuidv4()} className='badge'>{el}</span>)) || value)}
            </div>
        </div>
    )
}
