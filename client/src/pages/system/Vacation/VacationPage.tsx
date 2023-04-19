import React, { useState } from 'react';
import './index.scss';
import { DatePicker } from 'antd';
import Page from '../../../components/Page';
import { PageProps } from '../../../models/IPage';
import dayjs from 'dayjs';


const { RangePicker } = DatePicker;

export const VacationPage: React.FC<React.PropsWithChildren<PageProps>> = ({ title }) => {
    const limit = 5;
    const [selectedDates, setSelectedDates] = useState();

    const handleDateChange = (dates) => setSelectedDates(dates);

    const disabledDate = (currentDate: dayjs.Dayjs) => currentDate.isBefore(dayjs(), 'day');

    const confirm = () => {
        console.log(')');
    }

    return (
        <Page title={title}>
            <div className="flex gap-30">
                <div className="flex flex-column gap-30">
                    <div className="dashboard-content-block">
                        <div className="dashboard-content-block__title">Выберите прериод отупуска</div>
                        <RangePicker
                            format='DD.MM.YYYY'
                            value={selectedDates}
                            disabledDate={disabledDate}
                            onChange={handleDateChange}
                        />

                        {selectedDates && (
                            <div style={{ marginTop: 30 }}>
                                <button onClick={confirm} type='button' className='button button--default'>Оформить</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Page>
    );
};
