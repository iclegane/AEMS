import React from 'react';
import {Link} from 'react-router-dom';
import {truncate} from '../../utils/truncate';
import {ITask} from './types';
import './index.scss';


export const Task: React.FC<ITask> = ({id, index, name, deadline, created, status, manager}) => {

    const shortName = truncate(name, 33);

    return(
        <Link to={`${id}`} className="task">
            <div className="task__wrapper">
                <div className="flex justify-content-sb align-items-c">
                    <div className="task__field task__field--index">{index}</div>
                    <div className="task__field task__field--name">{shortName}</div>
                    <div className="task__field task__field--createAt">{created}</div>
                    <div className="task__field task__field--deadline">{deadline}</div>
                    <div className="task__field task__field--status">{status}</div>
                    <div className="task__field task__field--manager">{manager}</div>
                </div>
            </div>
        </Link>
    );
};
