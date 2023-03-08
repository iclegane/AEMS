import React from "react";
import {createBrowserRouter} from "react-router-dom";
import TasksPage from "../pages/system/TasksPage";
import TaskPage from "../pages/system/TaskPage";
import AuthPage from "../pages/system/AuthPage";
import ProfilePage from "../pages/system/ProfilePage";
import MainPage from "../pages/system/MainPage";


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
                    {path: 'tasks/:id', element: <TaskPage/>}
                ]
            }
        ],
    }
]);

export default UserRouter;
