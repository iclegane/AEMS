import React from 'react';
import { RouterProvider } from 'react-router-dom';
import UserRouter from '../../routes/UserRouter';
import '@styles/index.scss';
import AdminRouter from '../../routes/AdminRouter';
import UnauthorizedRouter from '../../routes/UnauthorizedRouter';
import { useRefreshAuth } from '../../hooks/useRefreshAuth';

 
export const App: React.FC = () => {
    const { auth, isLoading, error } = useRefreshAuth();

    if (isLoading) {
        return null;
    }

    if (error) {
        return null;
    }

    if (auth.user) {
        const Router = auth.user.role === 'Admin' ? AdminRouter : UserRouter;
        return <RouterProvider router={Router} />;
    }

    return <RouterProvider router={UnauthorizedRouter} />;
};
