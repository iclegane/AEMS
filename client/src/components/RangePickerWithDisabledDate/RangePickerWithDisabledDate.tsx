import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs  from 'dayjs';
import React, { useState } from 'react';
import { RangePickerWithDisabledDateProps, RangeValue } from './types';


const { RangePicker } = DatePicker;

export const RangePickerWithDisabledDate: React.FC<RangePickerWithDisabledDateProps> = ({ limit, onChange }) => {
  const [disabledDate, setDisabledDate] = useState<
    RangePickerProps['disabledDate']
  >(() => false);

  const handleFirstDateChange = (values: RangeValue) => {
    if (!values) {
      setDisabledDate((prev) => !prev);

      return;
    }

    const [start, end] = values || [null, null];
    const maxDate = dayjs(start).add(limit, 'day');
    const minDate = dayjs(end).add(-limit, 'day');

    setDisabledDate(() => (current) => current.isAfter(maxDate) || current.isBefore(minDate));
  };

  const onChangeHandler = (dates: RangeValue, dateStrings) => {
    if (onChange) {
      const [start, end] = dateStrings;

      onChange([start || null, end || null]);
    }
  };

  return (
    <RangePicker
      format="DD.MM.YYYY"
      disabledDate={disabledDate}
      onCalendarChange={handleFirstDateChange}
      onChange={onChangeHandler}
    />
  );
};
