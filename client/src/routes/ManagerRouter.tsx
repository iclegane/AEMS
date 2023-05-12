import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TasksPage from '../pages/system/TasksPage';
import TaskPage from '../pages/system/TaskPage';
import AuthPage from '../pages/system/AuthPage';
import ProfilePage from '../pages/system/ProfilePage';
import VacationPage from '../pages/system/Vacation';
import CalendarPage from '../pages/system/CalendarPage';
import UsersPage from '../pages/system/UsersPage';
import UserAdministrationPage from '../pages/system/UserAdministrationPage';
import { SystemPage } from '../pages/system/SystemPage/SystemPage';
import ErrorPage from '../pages/system/ErrorPage';


export const ManagerRouter = () => (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="system" element={<SystemPage title="Главная страница"/>}>
            <Route path="profile" element={<ProfilePage title="Профиль"/>} />
            <Route path="tasks" element={<TasksPage title="Задачи"/>} />
            <Route path="tasks/:id" element={<TaskPage title="Задача"/>} />
            <Route path="vacation" element={<VacationPage title="Отпуск"/>} />
            <Route path="calendar" element={<CalendarPage title="Календарь"/>} />
            <Route path="users" element={<UsersPage title="Пользователи"/>} />
            <Route path="users/:id" element={<UserAdministrationPage title="Пользователь"/>} />
        </Route>
      <Route path="*" element={<ErrorPage title="Page not found" />} />
    </Routes>
);

export default ManagerRouter;
