import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "@pages/system/MainPage";
import '@styles/index.scss';

const router = createBrowserRouter([
    {
        path: "/",
        element: 'Promo page',
    },
    {
        path: "system",
        element: <MainPage />,
        children: []
    }
]);

export const App: React.FC = () => {
    return (
        <RouterProvider router={router} />
    )
}
