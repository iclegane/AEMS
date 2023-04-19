import React from 'react';
import { RouterProvider } from 'react-router-dom';
import UserRouter from '../../routes/UserRouter';
import '@styles/index.scss';
import AdminRouter from '../../routes/AdminRouter';
import UnauthorizedRouter from '../../routes/UnauthorizedRouter';
import { useRefreshAuth } from '../../hooks/useRefreshAuth';
import ManagerRouter from '../../routes/ManagerRouter.';

 
export const App: React.FC = () => {
    const { auth, isLoading, error } = useRefreshAuth();

    if (isLoading) {
        return null;
    }

    if (error) {
        return null;
    }

    if (auth.user) {
        if (auth.user.role === 'Admin') {
            return <RouterProvider router={AdminRouter} />;
        }

        if (auth.user.role === 'Manager') {
            return <RouterProvider router={ManagerRouter} />;
        }

        if (auth.user.role === 'User') {
            return <RouterProvider router={UserRouter} />;
        }
    }

    return <RouterProvider router={UnauthorizedRouter} />;
};
