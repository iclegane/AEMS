import React, {useEffect} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import MainPage from '@pages/system/MainPage';
import AuthPage from '@pages/system/AuthPage';
import ProfilePage from "@pages/system/ProfilePage";
import '@styles/index.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {checkAuth} from "../../store/actions/AuthAction";


const router = createBrowserRouter([
    {
        path: '/',
        errorElement: '404',
        children: [
            {path: '', element: 'Promo page'},
            {path: 'login', element: <AuthPage />},
            {path: 'system', element: <MainPage />,
                children: [
                    {path: 'profile', element: <ProfilePage />}
                ]
            }
        ],
    }
]);

export const App: React.FC = () => {

    const dispatch = useAppDispatch();
    const {isLoading} = useAppSelector(state => state.authReducer);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [dispatch]);

    if (isLoading) {
        return null;
    }

    return (
        <RouterProvider router={router} />
    );
};
