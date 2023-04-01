import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import TasksPage from '../pages/system/TasksPage';
import TaskPage from '../pages/system/TaskPage';
import AuthPage from '../pages/system/AuthPage';
import ProfilePage from '../pages/system/ProfilePage';
import MainPage from '../pages/system/MainPage';
import VacationPage from '../pages/system/Vacation';
import CalendarPage from "../pages/system/CalendarPage";
import UsersPage from "../pages/system/UsersPage";
import FilesPage from "../pages/system/FilesPage";
import SettingsPage from "../pages/system/SettingsPage";


const UserRouter = createBrowserRouter([
    {
        path: '/',
        errorElement: '404',
        children: [
            {index: true, element: 'Promo page'},
            {path: 'login', element: <AuthPage />},
            {path: 'system', element: <MainPage title="Main page" />,
                children: [
                    {path: 'profile', element: <ProfilePage/>},
                    {path: 'tasks', element: <TasksPage/>},
                    {path: 'tasks/:id', element: <TaskPage/>},
                    {path: 'vacation', element: <VacationPage/>},
                    {path: 'calendar', element: <CalendarPage/>},
                    {path: 'users', element: <UsersPage/>},
                    {path: 'files', element: <FilesPage/>},
                    {path: 'settings', element: <SettingsPage/>},
                ]
            }
        ],
    }
]);

export default UserRouter;
