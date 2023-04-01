import { createAction } from '@reduxjs/toolkit';

export const setPageTitle = createAction<string>('pageTitle/set');
