import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {IFieldList} from './types';
import FieldItem from './FieldItem';


export const FieldList: React.FC<IFieldList> = ({type, view, elements}) => {

    const styles = [];

    if (type) styles.push('field-list--column');

    if (view) styles.push('field-list--alternating');

    return (
        <div className={`field-list ${styles.join(' ')}`}>
            {elements && elements.map((el) => {return (
                <FieldItem
                    key={uuidv4()}
                    name={el.name}
                    value={el.value}
                />
            );})}
        </div>
    );
};
