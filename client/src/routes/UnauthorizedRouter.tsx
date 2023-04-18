import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AuthPage from '../pages/system/AuthPage';
import ErrorPage from '../pages/system/ErrorPage';


const UnauthorizedRouter = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage title='Error' />,
        children: [
            { index: true, element: 'Promo page' },
            { path: 'login', element: <AuthPage /> },
        ],
    }
]);

export default UnauthorizedRouter;
