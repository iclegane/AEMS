import React from "react";
import {IFieldList} from "./types";
import FieldItem from "./FieldItem";
import {v4 as uuidv4} from "uuid";


export const FieldList: React.FC<IFieldList> = ({type, view, elements}) => {

    let styles = [];

    if (type) styles.push('field-list--column');

    if (view) styles.push('field-list--alternating');

    return (
        <div className={`field-list ${styles.join(' ')}`}>
            {elements && elements.map((el) => (
                <FieldItem
                    key={uuidv4()}
                    name={el.name}
                    value={el.value}
                />
            ))}
        </div>
    )
}
