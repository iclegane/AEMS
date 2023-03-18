import React from "react";
import Select from 'react-select';
import {useGetStatusesQuery} from "../../api/statuses";


export const TaskSelectStatuses: React.FC<{
    onSelect: (opt: any) => void
}> = (props) => {

    const {data, isSuccess} = useGetStatusesQuery(null);
    if (!isSuccess) return null;

    const items = data.map((status) => ({
        value: status.id,
        label: status.name
    }));

    const currentItem = {...items.find((opt) => opt.label === 'Инициализация')}

    return (
        <Select
            defaultValue={currentItem}
            onChange={(opt) => props.onSelect(opt)}
            options={items}
        />
    )
}
