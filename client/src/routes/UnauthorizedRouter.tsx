import React from 'react';
import { createHashRouter } from 'react-router-dom';
import AuthPage from '../pages/system/AuthPage';
import ErrorPage from '../pages/system/ErrorPage';


const UnauthorizedRouter = createHashRouter([
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
