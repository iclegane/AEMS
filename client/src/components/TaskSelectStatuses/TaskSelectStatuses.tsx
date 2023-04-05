import React from 'react';
import Select from 'react-select';
import { useGetStatusesQuery } from '../../api/statuses';


interface ITaskSelectStatuses {
    onSelect: (opt: any) => void
    current?: string;
}

export const TaskSelectStatuses: React.FC<ITaskSelectStatuses> = ({ onSelect, current }) => {

    const { data, isSuccess } = useGetStatusesQuery(null);
    if (!isSuccess) return null;

    const items = data.map((status) => ({
        value: status.id,
        label: status.name
    }));

    const currentItem = { ...items.find((opt) => opt.label === current) };

    return (
        <Select
            defaultValue={currentItem}
            onChange={(opt) => onSelect(opt)}
            options={items}
        />
    );
};
