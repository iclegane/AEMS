import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import TasksPage from '../pages/system/TasksPage';
import TaskPage from '../pages/system/TaskPage';
import AuthPage from '../pages/system/AuthPage';
import ProfilePage from '../pages/system/ProfilePage';
import VacationPage from '../pages/system/Vacation';
import CalendarPage from '../pages/system/CalendarPage';
import UsersPage from '../pages/system/UsersPage';
import FilesPage from '../pages/system/FilesPage';
import SettingsPage from '../pages/system/SettingsPage';
import UserAdministrationPage from '../pages/system/UserAdministrationPage';
import { SystemPage } from '../pages/system/SystemPage/SystemPage';
import ErrorPage from '../pages/system/ErrorPage';


const AdminRouter = createBrowserRouter([
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
                    { path: 'users', element: <UsersPage title="Пользователи"/> },
                    { path: 'users/:id', element: <UserAdministrationPage title="Пользователь"/> },
                    { path: 'files', element: <FilesPage title="Файлы"/> },
                    { path: 'settings', element: <SettingsPage title="Настройки"/> },
                ]
            }
        ],
    }
]);

export default AdminRouter;
