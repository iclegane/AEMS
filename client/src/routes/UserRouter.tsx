import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TasksPage from '../pages/system/TasksPage';
import TaskPage from '../pages/system/TaskPage';
import AuthPage from '../pages/system/AuthPage';
import ProfilePage from '../pages/system/ProfilePage';
import VacationPage from '../pages/system/Vacation';
import { SystemPage } from '../pages/system/SystemPage/SystemPage';
import ErrorPage from '../pages/system/ErrorPage';
 
 
export const UserRouter = () => (
    <Routes>
      <Route path="/" element="Promo page" />
      <Route path="/login" element={<AuthPage />} />
      <Route path="system/*" element={
        <Routes>
            <Route path="profile" element={<ProfilePage title="Профиль"/>} />
            <Route path="tasks" element={<TasksPage title="Задачи"/>} />
            <Route path="tasks/:id" element={<TaskPage title="Задача"/>} />
            <Route path="vacation" element={<VacationPage title="Отпуск"/>} />
        </Routes>
      } />
      <Route path="*" element={<ErrorPage title="Page not found" />} />
    </Routes>
);

export default UserRouter;
