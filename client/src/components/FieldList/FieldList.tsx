import React from 'react';
import {IFieldList} from './types';
import FieldItem from './FieldItem';


export const FieldList: React.FC<IFieldList> = React.memo(({ type, view, elements }) => {

    const styles = [];

    if (type) styles.push('field-list--column');

    if (view) styles.push('field-list--alternating');

    return (
        <div className={`field-list ${styles.join(' ')}`}>
            {elements.map((el) => (
                <FieldItem key={el.name + el.value} name={el.name} value={el.value} />
            ))}
        </div>
    );
});
