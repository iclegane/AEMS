import { Dayjs } from 'dayjs';


export type RangeValue = [Dayjs | null, Dayjs | null] | null;

export interface RangePickerWithDisabledDateProps {
    limit: number;
    onChange?: (dates: string[]) => void;
}
