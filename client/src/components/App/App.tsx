import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { checkAuth } from '../../store/actions/AuthAction';
import UserRouter from '../../routes/UserRouter';
import '@styles/index.scss';
import { RootState } from '../../store/store';
import AdminRouter from '../../routes/AdminRouter';
import { useRole } from '../../hooks/useRole';
import UnauthorizedRouter from '../../routes/UnauthorizedRouter';
import { useIsAuth } from '../../hooks/useIsAuth';


let didInit = false;

const AppConnect: React.FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useIsAuth();
    const role = useRole();

    useEffect(() => {
        if (!didInit) {
            didInit = true;
            if (localStorage.getItem('token')) {
                dispatch(checkAuth());
            }
        }
    }, [dispatch]);

    if (isAuth) {
        const Router = role === 'Admin' ? AdminRouter : UserRouter;
        return <RouterProvider router={Router} />;
    }

    return <RouterProvider router={UnauthorizedRouter} />;
};

export const App: React.FC = () => {
    const { isLoading } = useAppSelector((state: RootState) => state.authReducer);

    if (isLoading) {
        return null;
    }

    return <AppConnect />;
};
