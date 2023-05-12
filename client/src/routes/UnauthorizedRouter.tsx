import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/system/AuthPage';
import ErrorPage from '../pages/system/ErrorPage';
 
 
export const UnauthorizedRouter = () => (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<ErrorPage title="Page not found" />} />
    </Routes>
);

export default UnauthorizedRouter;
