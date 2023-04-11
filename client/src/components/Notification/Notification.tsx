import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { SERVER_URL } from '../../utils/constants';
import { useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store/store';
import { openNotification } from '../../utils/openNotification';


export const Notification: React.FunctionComponent  = () => {
    
    const { user } = useAppSelector((state: RootState) => state.authReducer.auth);
    
    useEffect(() => {
        const socket = io(`${SERVER_URL}`, {
            auth: {
                token: window.localStorage.getItem('token')
            }
        });

        socket.on('connect', () => {
            if (user?.id) {
                socket.emit('joinRoom', `performer-${user?.id}`);
            }
        });

        socket.on('createTask', (message: string) => {
            openNotification({
                name: 'Доблена новая задача',
                description: message,
            });
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return null;
};
