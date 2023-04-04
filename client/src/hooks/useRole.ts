import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {RootState} from '../store/store';
import {UserRole} from '../models/IUser';


export const useRole = (): UserRole => {
    const role = useSelector((state: RootState) => state.authReducer.auth.user?.role);
    return useMemo(() => role || 'Guest', [role]);
};
