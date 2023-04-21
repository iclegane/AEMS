import React, { useState } from 'react';
import './index.scss';
import dayjs from 'dayjs';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import Page from '../../../components/Page';
import { PageProps } from '../../../models/IPage';
import { RangePickerWithDisabledDate } from '../../../components/RangePickerWithDisabledDate /RangePickerWithDisabledDate';
import { useCreateVacationPdfMutation } from '../../../api/vacation';
import { API_URL } from '../../../utils/constants';


export const VacationPage: React.FC<React.PropsWithChildren<PageProps>> = ({
    title,
}) => {
    const [link, setLink] = useState('');
    const [CreateVacationPdf, { isLoading, isSuccess }] = useCreateVacationPdfMutation();
    const [vacantionDays, setVacantionDays] = useState([null, null]);

    const onChangeHandler = (values) => {
        setVacantionDays(values);
    }; 
    
    const onClickHandler = async () => {
        try {
            const start = dayjs(vacantionDays[0], 'DD.MM.YYYY');
            const end = dayjs(vacantionDays[1], 'DD.MM.YYYY');
            const days = end.diff(start, 'day') + 1;

            const params = {
                start: start.format('DD.MM.YYYY'),
                end: end.format('DD.MM.YYYY'),
                days
            };
 
            const documentName = await CreateVacationPdf(params).unwrap();

            const pathToPdf = `${API_URL}/pdf/${documentName}`; 

            setVacantionDays([null, null]);
            setLink(pathToPdf);
        } catch(e) {
            console.log(e);
        }
    };

    return (
        <Page title={title}>
            <div className="flex gap-30">
                <div className="flex flex-column gap-30">
                    <Spin spinning={isLoading}>
                        <div className="dashboard-content-block">
                            <div className="dashboard-content-block__title">
                                Выберите прериод отупуска
                            </div>
                            <RangePickerWithDisabledDate
                                limit={28}
                                onChange={onChangeHandler}
                            />
                            {vacantionDays.filter((el) => el === null).length ? null : (
                                <div style={{ marginTop: 30 }}>
                                    <button onClick={onClickHandler} type="button" className="button button--default">
                                        Оформить
                                    </button>
                                </div>
                            )}
                            {isSuccess && (
                                <div style={{ marginTop: 30 }} className="flex">
                                    <Link target='_blank' to={link}>Скачать документ</Link>
                                </div>
                            )}
                        </div>
                    </Spin>
                </div>
            </div>
        </Page>
    );
};
