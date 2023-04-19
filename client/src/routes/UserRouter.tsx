import React from 'react';
import { createHashRouter } from 'react-router-dom';
import TasksPage from '../pages/system/TasksPage';
import TaskPage from '../pages/system/TaskPage';
import AuthPage from '../pages/system/AuthPage';
import ProfilePage from '../pages/system/ProfilePage';
import VacationPage from '../pages/system/Vacation';
import { SystemPage } from '../pages/system/SystemPage/SystemPage';
import ErrorPage from '../pages/system/ErrorPage';


const UserRouter = createHashRouter([
    {
        path: '/',
        errorElement: <ErrorPage title='Error' />,
        children: [
            { index: true, element: 'Promo page' },
            { path: 'login', element: <AuthPage /> },
            { path: 'system', element: <SystemPage title="Главная страница" />,
                children: [
                    { path: 'profile', element: <ProfilePage title="Профиль"/> },
                    { path: 'tasks', element: <TasksPage title="Задачи"/> },
                    { path: 'tasks/:id', element: <TaskPage title="Задача"/> },
                    { path: 'vacation', element: <VacationPage title="Отпуск"/> },
                ]
            }
        ],
    }
]);

export default UserRouter;
