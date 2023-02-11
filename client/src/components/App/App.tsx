import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '@pages/system/MainPage';
import AuthPage from '@pages/system/AuthPage';
import '@styles/index.scss';


const router = createBrowserRouter([
    {
        path: '/',
        element: 'Promo page',
    },
    {
        path: 'system',
        element: <MainPage />,
        children: []
    },
    {
        path: 'login',
        element: <AuthPage />,
        children: []
    }
]);

export const App: React.FC = () => {
    return (
        <RouterProvider router={router} />
    );
};
