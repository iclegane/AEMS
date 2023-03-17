import React, {useState} from 'react';
import './index.scss';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../../../styles/utils/calendar.css';
import moment from "moment";


export const VacationPage: React.FC = () => {

    const [date, setDate] = useState<string[]>([]);

    const handleOnChange = (dates: Date[]) => {
        let range = dates.map((date) => {
            return moment(date).format('DD.MM.YYYY')
        })

        setDate(range);
    }

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (date.length) {
            console.log('sub')
        }
    }

    return (
        <div className={'flex gap-30'}>
            <div className={'flex flex-column gap-30'}>
                <div className="dashboard-content-block">
                    <div className="dashboard-content-block__title">Календарь</div>
                    <Calendar
                        onChange={handleOnChange}
                        selectRange={true}
                        returnValue={'range'}
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
                    <button onClick={onSubmit} type={'button'} className={'button button--default'}>Оформить документ</button>
                </div>
            </div>
        </div>
    );
};
