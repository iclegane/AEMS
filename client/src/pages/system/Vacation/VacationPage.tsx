import React, { useState } from 'react';
import './index.scss';
import Page from '../../../components/Page';
import { PageProps } from '../../../models/IPage';
import { RangePickerWithDisabledDate } from '../../../components/RangePickerWithDisabledDate /RangePickerWithDisabledDate';


export const VacationPage: React.FC<React.PropsWithChildren<PageProps>> = ({
    title,
}) => {
    const [vacantionDays, setVacantionDays] = useState([null, null]);

    const onChangeHandler = (values) => {
        setVacantionDays(values);
    }; 
    
    return (
        <Page title={title}>
            <div className="flex gap-30">
                <div className="flex flex-column gap-30">
                    <div className="dashboard-content-block">
                        <div className="dashboard-content-block__title">
                            Выберите прериод отупуска
                        </div>
                        <RangePickerWithDisabledDate
                            limit={10}
                            onChange={onChangeHandler}
                        />
                        {vacantionDays.filter((el) => el === null).length ? null : (
                            <div style={{ marginTop: 30 }}>
                                <button type="button" className="button button--default">
                                    Оформить
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Page>
    );
};
