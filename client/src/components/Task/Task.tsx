import React from 'react';
import './index.scss';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {truncate} from '../../utils/truncate';


export interface ITask {
    id: number;
    index: number;
    name: string;
    createdAt: string;
    deadline: string;
    status: string;
    manager: string | null;
}

export const Task: React.FC<ITask> = (props) => {

    const {index, name, deadline, createdAt, status, manager} = props;
    const shortName = truncate(name, 33);

    return(
        <Link to={`${props.id}`} className="task">
            <div className="task__wrapper">
                <div className="flex justify-content-sb align-items-c">
                    <div className="task__field task__field--index">{index}</div>
                    <div className="task__field task__field--name">{shortName}</div>
                    <div className="task__field task__field--createAt">{moment(Date.parse(createdAt)).format('DD.MM.YYYY')}</div>
                    <div className="task__field task__field--deadline">{moment(Date.parse(deadline)).format('DD.MM.YYYY')}</div>
                    <div className="task__field task__field--status">{status}</div>
                    <div className="task__field task__field--manager">{manager}</div>
                </div>
            </div>
        </Link>
    );
};
