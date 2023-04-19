import { useEffect, useRef } from 'react';
import { checkAuth } from '../store/actions/AuthAction';
import { useAppDispatch, useAppSelector } from './redux';
import { REFRESH_TIME } from '../utils/constants';
import { RootState } from '../store/store';


// todo: after change on interceptors
export const useRefreshAuth = () => {
    const dispatch = useAppDispatch();
    const { auth, isLoading, error } = useAppSelector((state: RootState) => state.authReducer);

    
    const didInitRef = useRef(false);
    const refreshTokenTimerRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (!didInitRef.current) {
            didInitRef.current = true;
            if (localStorage.getItem('token')) {
                dispatch(checkAuth());
            }
        }

        refreshTokenTimerRef.current = setInterval(() => {
            dispatch(checkAuth());
        }, REFRESH_TIME);

        return () => {
            clearInterval(refreshTokenTimerRef.current);
        };
    }, []);

    return { auth, isLoading, error };
};
