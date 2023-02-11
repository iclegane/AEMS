import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '@pages/system/MainPage';
import AuthPage from '@pages/system/AuthPage';
import ProfilePage from "@pages/system/ProfilePage";
import '@styles/index.scss';


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
    return (
        <RouterProvider router={router} />
    );
};
