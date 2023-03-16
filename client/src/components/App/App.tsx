import React, {useEffect} from 'react';
import {RouterProvider} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {checkAuth} from '../../store/actions/AuthAction';
import UserRouter from '../../routes/UserRouter';
import '@styles/index.scss';


let didInit = false;

export const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const {isLoading} = useAppSelector(state => {return state.authReducer;});

    useEffect(() => {
        if (!didInit) {
            didInit = true;
            if (localStorage.getItem('token')) {
                dispatch(checkAuth());
            }
        }
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <RouterProvider router={UserRouter} />
    );
};
