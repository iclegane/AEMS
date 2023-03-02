import React, {useEffect} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import MainPage from '@pages/system/MainPage';
import AuthPage from '@pages/system/AuthPage';
import ProfilePage from '@pages/system/ProfilePage';
import '@styles/index.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {checkAuth} from '../../store/actions/AuthAction';
import TasksPage from "../../pages/system/TasksPage";
import TaskPage from "../../pages/system/TaskPage";


const router = createBrowserRouter([
    {
        path: '/',
        errorElement: '404',
        children: [
            {index: true, element: 'Promo page'},
            {path: 'login', element: <AuthPage />},
            {path: 'system', element: <MainPage title="Main page" />,
                children: [
                    {path: 'profile', element: <ProfilePage/>},
                    {path: 'tasks', element: <TasksPage/>},
                    {path: 'tasks/:id', element: <TaskPage/>}
                ]
            }
        ],
    }
]);

let didInit: boolean = false;

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
        <RouterProvider router={router} />
    );
};
