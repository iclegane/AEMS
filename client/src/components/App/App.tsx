import React from 'react';
import { RouterProvider } from 'react-router-dom';
import UserRouter from '../../routes/UserRouter';
import '@styles/index.scss';
import AdminRouter from '../../routes/AdminRouter';
import { useRole } from '../../hooks/useRole';
import UnauthorizedRouter from '../../routes/UnauthorizedRouter';
import { useIsAuth } from '../../hooks/useIsAuth';
import { useRefreshAuth } from '../../hooks/useRefreshAuth';

 
const AppConnect: React.FC = () => {
    const isAuth = useIsAuth();
    const role = useRole();
    useRefreshAuth();

    if (isAuth) {
        const Router = role === 'Admin' ? AdminRouter : UserRouter;
        return <RouterProvider router={Router} />;
    }

    return <RouterProvider router={UnauthorizedRouter} />;
};

export const App: React.FC = () => <AppConnect />;
