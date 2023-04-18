import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import TasksPage from '../pages/system/TasksPage';
import TaskPage from '../pages/system/TaskPage';
import AuthPage from '../pages/system/AuthPage';
import ProfilePage from '../pages/system/ProfilePage';
import VacationPage from '../pages/system/Vacation';
import CalendarPage from '../pages/system/CalendarPage';
import SettingsPage from '../pages/system/SettingsPage';
import { SystemPage } from '../pages/system/SystemPage/SystemPage';
import ErrorPage from '../pages/system/ErrorPage';


const UserRouter = createBrowserRouter([
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
                    { path: 'calendar', element: <CalendarPage title="Календарь"/> },
                    { path: 'settings', element: <SettingsPage title="Настройки"/> },
                ]
            }
        ],
    }
]);

export default UserRouter;
