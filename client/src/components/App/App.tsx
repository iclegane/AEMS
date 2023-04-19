import React from 'react';
import { useRefreshAuth } from '../../hooks/useRefreshAuth';
import { UnauthorizedRouter } from '../../routes/UnauthorizedRouter';
import { AdminRouter } from '../../routes/AdminRouter';
import { ManagerRouter } from '../../routes/ManagerRouter';
import { UserRouter } from '../../routes/UserRouter';
import '@styles/index.scss';

 
export const App: React.FC = () => {
    const { auth, isLoading, error } = useRefreshAuth();

    if (isLoading) {
        return null;
    }

    if (error) {
        return <UnauthorizedRouter/>;
    }

    if (auth.user) {
        if (auth.user.role === 'Admin') {
            return <AdminRouter/>;
        }   

        if (auth.user.role === 'Manager') {
            return <ManagerRouter/>;
        }    

        if (auth.user.role === 'User') {
            return <UserRouter/>;
        }    
    };

    return <UnauthorizedRouter/>;
};
