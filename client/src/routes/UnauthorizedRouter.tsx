import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AuthPage from '../pages/system/AuthPage';


const UnauthorizedRouter = createBrowserRouter([
    {
        path: '/',
        errorElement: '404',
        children: [
            { index: true, element: 'Promo page' },
            { path: 'login', element: <AuthPage /> },
        ],
    }
]);

export default UnauthorizedRouter;
