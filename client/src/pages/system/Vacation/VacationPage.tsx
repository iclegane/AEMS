import React, { useState } from 'react';
import './index.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../styles/utils/calendar.css';
import moment from 'moment';
import Page from '../../../components/Page';


interface VacationPageProps {
    title: string;
}

export const VacationPage: React.FC<React.PropsWithChildren<VacationPageProps>> = ({ title }) => {

    const [date, setDate] = useState<string[]>([]);

    const handleOnChange = (dates: Date[]) => {
        const range = dates.map((date) => moment(date).format('DD.MM.YYYY'));

        setDate(range);
    };

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (date.length) {
            console.log('sub');
        }
    };

    return (
        <Page title={title}>
            <div className="flex gap-30">
                <div className="flex flex-column gap-30">
                    <div className="dashboard-content-block">
                        <div className="dashboard-content-block__title">Календарь</div>
                        <Calendar
                            onChange={handleOnChange}
                            selectRange
                            returnValue="range"
                            minDate={new Date()}
                        />
                    </div>
                    <div className="dashboard-content-block">
                        <div className="dashboard-content-block__title">Оформление</div>
                        {date.length > 0 && (
                            <div>c {date[0]} по {date[1]}</div>
                        )}
                        <small>После оформление документ будет передан менеджеру</small>
                        <br/>
                        <br/>
                        <button onClick={onSubmit} type="button" className="button button--default">Оформить документ</button>
                    </div>
                </div>
            </div>
        </Page>
    );
};
